import { Router } from 'express';
import PagarmeService from '../services/pagarme/index.js';

/**
 * Rotas públicas (sem autenticação).
 * @param {import('../repository/mongodb.js').default} repository
 * @returns {Router}
 */
export default function createPublicRoutes(repository) {
    const router = Router();
    const pagarme = new PagarmeService();

    // GET /api/public/checkout/:link — Busca CheckoutLink pelo slug
    router.get('/checkout/:link', async (req, res) => {
        const { link } = req.params;
        const [checkoutLink, notFound] = await repository.findOne('CheckoutLinks', { link });
        if (notFound || !checkoutLink) {
            return res.status(404).json({ error: 'Link de checkout não encontrado' });
        }
        if (checkoutLink.status !== 'ativo') {
            return res.status(410).json({ error: 'Este link de checkout não está mais disponível' });
        }
        if (checkoutLink.validade && new Date(checkoutLink.validade) < new Date()) {
            return res.status(410).json({ error: 'Este link de checkout expirou' });
        }

        // Busca dados do produto
        const [produto] = await repository.findOne('Produtos', { _id: checkoutLink.produto });

        res.json({ checkoutLink, produto: produto || null });
    });

    // POST /api/public/clientes — Cria cliente (registro no checkout)
    router.post('/clientes', async (req, res) => {
        const { nome, email, telefone, cnpj, cep, logradouro, bairro, cidade, estado, pais } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios' });
        }

        const cliente = {
            nome, email, telefone,
            cnpj: cnpj || null,
            cep: cep || null,
            logradouro: logradouro || null,
            bairro: bairro || null,
            cidade: cidade || null,
            estado: estado || null,
            pais: pais || 'Brasil',
            criado_em: new Date().toISOString(),
        };

        const [result, err] = await repository.create('Clientes', cliente);
        if (err) return res.status(500).json({ error: 'Erro ao criar cliente' });
        res.status(201).json(result);
    });

    // GET /api/public/cupom/:codigo — Valida cupom
    router.get('/cupom/:codigo', async (req, res) => {
        const { codigo } = req.params;
        const [cupom, notFound] = await repository.findOne('Cupons', { codigo });

        if (notFound || !cupom) {
            return res.status(404).json({ error: 'Cupom não encontrado' });
        }
        if (cupom.status !== 'ativo') {
            return res.status(400).json({ error: 'Cupom não está ativo' });
        }
        if (cupom.validade && new Date(cupom.validade) < new Date()) {
            return res.status(400).json({ error: 'Cupom expirado' });
        }
        if (cupom.usos_atuais >= cupom.usos_maximos) {
            return res.status(400).json({ error: 'Cupom atingiu o limite de usos' });
        }

        res.json({
            _id: cupom._id,
            codigo: cupom.codigo,
            desconto_percentual: cupom.desconto_percentual || null,
            desconto_valor: cupom.desconto_valor || null,
        });
    });

    // POST /api/public/checkout/process — Processa pagamento
    router.post('/checkout/process', async (req, res) => {
        const { checkoutLinkId, clienteId, cardData } = req.body;

        if (!checkoutLinkId || !clienteId) {
            return res.status(400).json({ error: 'checkoutLinkId e clienteId são obrigatórios' });
        }

        // Busca checkout link
        const [checkoutLink, clNotFound] = await repository.findOne('CheckoutLinks', { _id: checkoutLinkId });
        if (clNotFound || !checkoutLink) {
            return res.status(404).json({ error: 'Checkout link não encontrado' });
        }

        // Busca cliente
        const [cliente, clienteNotFound] = await repository.findOne('Clientes', { _id: clienteId });
        if (clienteNotFound || !cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        // Cria customer no PagarMe
        const [customer, customerErr] = await pagarme.createCustomer(cliente);
        if (customerErr) {
            return res.status(500).json({ error: 'Erro ao registrar cliente no gateway de pagamento', details: customer });
        }

        // Prepara splits com cardData para cartão
        const splitsComCard = checkoutLink.splits.map(split => ({
            ...split,
            cardData: split.metodo === 'cartao' ? cardData : undefined,
        }));

        // Cria order no PagarMe
        const [order, orderErr] = await pagarme.createOrder({
            customerId: customer.id,
            splits: splitsComCard,
            items: [{ valor: checkoutLink.valor_total, descricao: 'Assinatura' }],
        });

        if (orderErr) {
            return res.status(500).json({ error: 'Erro ao processar pagamento', details: order });
        }

        // Cria registros de pagamento no banco
        const pagamentos = [];
        for (const charge of (order.charges || [])) {
            const pagamento = {
                checkoutLink: checkoutLink._id,
                cliente: clienteId,
                metodo: charge.payment_method === 'credit_card' ? 'cartao' :
                        charge.payment_method === 'boleto' ? 'boleto' : 'pix',
                valor: charge.amount / 100,
                status: charge.status === 'paid' ? 'pago' : 'pendente',
                pagarme_id: charge.id,
                pagarme_order_id: order.id,
                criado_em: new Date().toISOString(),
                pago_em: charge.status === 'paid' ? new Date().toISOString() : null,
                // Dados adicionais para PIX/boleto
                pix_qr_code: charge.last_transaction?.qr_code || null,
                pix_qr_code_url: charge.last_transaction?.qr_code_url || null,
                boleto_url: charge.last_transaction?.url || null,
                boleto_barcode: charge.last_transaction?.line || null,
            };
            const [result] = await repository.create('Pagamentos', pagamento);
            pagamentos.push(result);
        }

        // Atualiza status do checkout link
        await repository.update('CheckoutLinks', checkoutLink._id, { status: 'usado' });

        // Incrementa uso do cupom se aplicável
        if (checkoutLink.cupom) {
            const [cupom] = await repository.findOne('Cupons', { _id: checkoutLink.cupom });
            if (cupom) {
                await repository.update('Cupons', cupom._id, {
                    usos_atuais: (cupom.usos_atuais || 0) + 1,
                });
            }
        }

        res.json({
            order_id: order.id,
            status: order.status,
            pagamentos,
        });
    });

    // GET /api/public/contrato-texto/:produtoId — Retorna texto do contrato
    router.get('/contrato-texto/:produtoId', async (req, res) => {
        const { produtoId } = req.params;
        const [produto] = await repository.findOne('Produtos', { _id: produtoId });

        // Texto padrão do contrato de adesão
        const textoContrato = produto?.contrato_texto ||
            `TERMO DE ADESÃO\n\n` +
            `Pelo presente instrumento, o(a) contratante declara estar ciente e de acordo com os termos e condições ` +
            `do programa "${produto?.titulo || 'Duo Academy'}", comprometendo-se a seguir as regras e diretrizes estabelecidas.\n\n` +
            `1. O acesso à plataforma é pessoal e intransferível.\n` +
            `2. O conteúdo disponibilizado é de propriedade exclusiva da Duo Academy.\n` +
            `3. O aluno se compromete a participar ativamente das atividades propostas.\n` +
            `4. A renovação está sujeita à disponibilidade e condições vigentes.\n\n` +
            `Ao assinar digitalmente este termo, o(a) contratante confirma que leu, entendeu e aceita todas as condições acima.`;

        res.json({ texto: textoContrato, produto: produto?.titulo || '' });
    });

    // POST /api/public/contratos — Aceita contrato (assinatura digital com CPF)
    router.post('/contratos', async (req, res) => {
        const { usuario, cpf, texto_contrato, checkoutLink } = req.body;

        if (!cpf || !texto_contrato) {
            return res.status(400).json({ error: 'CPF e texto do contrato são obrigatórios' });
        }

        const contrato = {
            usuario: usuario || null,
            cpf,
            data_aceite: new Date().toISOString(),
            texto_contrato,
            checkoutLink: checkoutLink || null,
        };

        const [result, err] = await repository.create('Contratos', contrato);
        if (err) return res.status(500).json({ error: 'Erro ao salvar contrato' });
        res.status(201).json(result);
    });

    return router;
}
