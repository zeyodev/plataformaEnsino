import { Router } from 'express';
import PagarmeService from '../services/pagarme/index.js';
import PosPagamento from '../services/pos-pagamento/index.js';

/**
 * Rotas de webhook (sem autenticação, validadas por assinatura).
 * @param {import('../repository/mongodb.js').default} repository
 * @param {import('socket.io').Server} io
 * @param {function} hashPII
 * @param {function} hashSenha
 * @returns {Router}
 */
export default function createWebhookRoutes(repository, io, hashPII, hashSenha) {
    const router = Router();
    const pagarme = new PagarmeService();

    // POST /api/webhooks/pagarme — Webhook do PagarMe
    router.post('/pagarme', async (req, res) => {
        // Valida assinatura do webhook
        const signature = req.headers['x-hub-signature'] || '';
        const rawBody = req.body;

        if (pagarme.webhookSecret && !pagarme.validateSignature(rawBody, signature)) {
            console.warn('[Webhook] Assinatura inválida');
            return res.status(401).json({ error: 'Assinatura inválida' });
        }

        let event;
        try {
            event = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
        } catch {
            return res.status(400).json({ error: 'Body inválido' });
        }

        console.log(`[Webhook] Evento recebido: ${event.type}`);

        // Processa eventos de charge (pagamento)
        if (event.type === 'charge.paid' || event.type === 'order.paid') {
            const chargeId = event.data?.id;
            if (!chargeId) {
                return res.status(200).json({ received: true });
            }

            // Busca pagamento pelo pagarme_id
            const [pagamento, notFound] = await repository.findOne('Pagamentos', { pagarme_id: chargeId });
            if (notFound || !pagamento) {
                // Tenta buscar pelo order_id
                const orderId = event.data?.order?.id || event.data?.id;
                const [pagByOrder] = await repository.findOne('Pagamentos', { pagarme_order_id: orderId });
                if (!pagByOrder) {
                    console.warn(`[Webhook] Pagamento não encontrado: ${chargeId}`);
                    return res.status(200).json({ received: true });
                }
                // Atualiza status
                await repository.update('Pagamentos', pagByOrder._id, {
                    status: 'pago',
                    pago_em: new Date().toISOString(),
                });

                // Processa pós-pagamento
                await PosPagamento.processar(pagByOrder, repository, io, hashPII, hashSenha);
                return res.status(200).json({ received: true, processed: true });
            }

            // Atualiza status do pagamento
            await repository.update('Pagamentos', pagamento._id, {
                status: 'pago',
                pago_em: new Date().toISOString(),
            });

            // Processa pós-pagamento
            await PosPagamento.processar(pagamento, repository, io, hashPII, hashSenha);
        }

        if (event.type === 'charge.refunded') {
            const chargeId = event.data?.id;
            if (chargeId) {
                const [pagamento] = await repository.findOne('Pagamentos', { pagarme_id: chargeId });
                if (pagamento) {
                    await repository.update('Pagamentos', pagamento._id, { status: 'reembolsado' });
                }
            }
        }

        if (event.type === 'charge.payment_failed') {
            const chargeId = event.data?.id;
            if (chargeId) {
                const [pagamento] = await repository.findOne('Pagamentos', { pagarme_id: chargeId });
                if (pagamento) {
                    await repository.update('Pagamentos', pagamento._id, { status: 'falhou' });
                }
            }
        }

        res.status(200).json({ received: true });
    });

    return router;
}
