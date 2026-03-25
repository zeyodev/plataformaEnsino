import EmailService from '../email/index.js';

/**
 * Serviço de automação pós-pagamento.
 * Cria usuário + assinatura automaticamente quando pagamento é confirmado.
 */
export default class PosPagamento {
    /**
     * Processa um pagamento confirmado.
     * @param {object} pagamento - Documento do Pagamento
     * @param {object} repository - RepositoryMongoDB
     * @param {object} io - Socket.io server instance
     * @param {function} hashPII - Função de hash LGPD
     * @param {function} hashSenha - Função de hash de senha
     */
    static async processar(pagamento, repository, io, hashPII, hashSenha) {
        try {
            // 1. Busca CheckoutLink
            const [checkoutLink, clNotFound] = await repository.findOne('CheckoutLinks', { _id: pagamento.checkoutLink });
            if (clNotFound || !checkoutLink) {
                console.error('[PosPagamento] CheckoutLink não encontrado:', pagamento.checkoutLink);
                return;
            }

            // 2. Busca Cliente
            const [cliente, clienteNotFound] = await repository.findOne('Clientes', { _id: pagamento.cliente });
            if (clienteNotFound || !cliente) {
                console.error('[PosPagamento] Cliente não encontrado:', pagamento.cliente);
                return;
            }

            // 3. Verifica se usuário já existe
            const emailHash = hashPII(cliente.email);
            const [existente] = await repository.findOne('Usuarios', { emailHash });

            let usuario;
            let senhaTemporaria = null;

            if (existente) {
                usuario = existente;
                console.log(`[PosPagamento] Usuário já existe: ${usuario._id}`);
            } else {
                // Cria novo usuário
                senhaTemporaria = EmailService.gerarSenhaTemporaria();
                const senhaHash = await hashSenha(senhaTemporaria);

                const novoUsuario = {
                    nome: hashPII(cliente.nome),
                    email: hashPII(cliente.email),
                    emailHash,
                    senhaHash,
                    role: 'user',
                    criado_em: new Date().toISOString(),
                };

                const [result, err] = await repository.create('Usuarios', novoUsuario);
                if (err) {
                    console.error('[PosPagamento] Erro ao criar usuário:', err);
                    return;
                }
                usuario = result;
                console.log(`[PosPagamento] Usuário criado: ${usuario._id}`);
            }

            // 4. Verifica se já existe assinatura ativa para este produto
            const [assinaturaExistente] = await repository.findOne('Assinaturas', {
                usuario: usuario._id,
                produto: checkoutLink.produto,
                status: 'ativa',
            });

            if (!assinaturaExistente) {
                // Cria assinatura
                const assinatura = {
                    usuario: usuario._id,
                    produto: checkoutLink.produto,
                    status: 'ativa',
                    dataInicio: new Date().toISOString(),
                    pagamento: pagamento._id,
                };

                const [assinaturaResult, assinaturaErr] = await repository.create('Assinaturas', assinatura);
                if (assinaturaErr) {
                    console.error('[PosPagamento] Erro ao criar assinatura:', assinaturaErr);
                    return;
                }
                console.log(`[PosPagamento] Assinatura criada: ${assinaturaResult._id}`);

                // 5. Emite evento Socket.io para admin
                if (io) {
                    io.emit('usuario:novo', {
                        usuario: { _id: usuario._id },
                        assinatura: assinaturaResult,
                    });
                }
            }

            // 6. Envia email de boas-vindas
            if (senhaTemporaria) {
                const [produto] = await repository.findOne('Produtos', { _id: checkoutLink.produto });
                const emailService = new EmailService();
                await emailService.enviarBoasVindas(
                    cliente.email,
                    cliente.nome,
                    senhaTemporaria,
                    produto?.titulo || 'Duo Academy',
                );
            }

            console.log('[PosPagamento] Fluxo concluído com sucesso.');
        } catch (err) {
            console.error('[PosPagamento] Erro no processamento:', err);
        }
    }
}
