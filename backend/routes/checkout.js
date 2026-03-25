import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
import { ulid } from 'ulid';

/**
 * Cria as rotas de checkout (admin).
 * @param {import('../repository/mongodb.js').default} repository
 * @returns {Router}
 */
export default function createCheckoutRoutes(repository) {
    const router = Router();

    // POST /api/checkout/build — Gera link de checkout (apenas admin)
    router.post('/build', authMiddleware, adminMiddleware, async (req, res) => {
        const { produto, splits, cupom, valor_total, validade } = req.body;

        if (!produto || !splits || !Array.isArray(splits) || splits.length === 0 || !valor_total) {
            return res.status(400).json({ error: 'Campos obrigatórios: produto, splits, valor_total' });
        }

        // Valida que soma dos splits bate com valor total
        const somaSplits = splits.reduce((acc, s) => acc + (s.valor || 0), 0);
        if (Math.abs(somaSplits - valor_total) > 0.01) {
            return res.status(400).json({
                error: `Soma dos splits (${somaSplits.toFixed(2)}) não corresponde ao valor total (${valor_total.toFixed(2)})`
            });
        }

        // Valida métodos
        const metodosValidos = ['pix', 'boleto', 'cartao'];
        for (const split of splits) {
            if (!metodosValidos.includes(split.metodo)) {
                return res.status(400).json({ error: `Método de pagamento inválido: ${split.metodo}` });
            }
        }

        // Verifica se o produto existe
        const [produtoDoc, notFound] = await repository.findOne('Produtos', { _id: produto });
        if (notFound || !produtoDoc) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Valida cupom se fornecido
        if (cupom) {
            const [cupomDoc, cupomNotFound] = await repository.findOne('Cupons', { _id: cupom });
            if (cupomNotFound || !cupomDoc) {
                return res.status(404).json({ error: 'Cupom não encontrado' });
            }
            if (cupomDoc.status !== 'ativo') {
                return res.status(400).json({ error: 'Cupom não está ativo' });
            }
        }

        const linkSlug = ulid().toLowerCase();
        const checkoutLink = {
            produto,
            splits,
            cupom: cupom || null,
            valor_total,
            criado_por: req.usuario._id,
            link: linkSlug,
            status: 'ativo',
            validade: validade || null,
            criado_em: new Date().toISOString(),
        };

        const [result, err] = await repository.create('CheckoutLinks', checkoutLink);
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar checkout link' });
        }

        res.status(201).json(result);
    });

    return router;
}
