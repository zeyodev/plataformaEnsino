import axios from 'axios';
import crypto from 'crypto';

const PAGARME_BASE_URL = 'https://api.pagar.me/core/v5';

/**
 * Wrapper para a API REST v5 do PagarMe/Stone.
 */
export default class PagarmeService {
    constructor() {
        this.apiKey = process.env.PAGARME_API_KEY || '';
        this.webhookSecret = process.env.PAGARME_WEBHOOK_SECRET || '';
        this.client = axios.create({
            baseURL: PAGARME_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}`,
            },
        });
    }

    /**
     * Cria um customer no PagarMe.
     * @param {object} cliente - { nome, email, telefone, cnpj, cep, logradouro, cidade, estado, pais }
     * @returns {Promise<[object, boolean]>}
     */
    async createCustomer(cliente) {
        try {
            const body = {
                name: cliente.nome,
                email: cliente.email,
                type: cliente.cnpj ? 'company' : 'individual',
                document: cliente.cnpj || undefined,
                phones: {
                    mobile_phone: {
                        country_code: '55',
                        area_code: cliente.telefone?.substring(0, 2) || '',
                        number: cliente.telefone?.substring(2) || '',
                    },
                },
                address: {
                    country: 'BR',
                    state: cliente.estado,
                    city: cliente.cidade,
                    zip_code: cliente.cep?.replace(/\D/g, '') || '',
                    line_1: cliente.logradouro || '',
                },
            };
            const { data } = await this.client.post('/customers', body);
            return [data, false];
        } catch (err) {
            console.error('[PagarMe] Erro ao criar customer:', err.response?.data || err.message);
            return [err.response?.data || err.message, true];
        }
    }

    /**
     * Cria uma order com múltiplos payments (splits).
     * @param {object} params - { customerId, splits, items }
     * @returns {Promise<[object, boolean]>}
     */
    async createOrder({ customerId, splits, items }) {
        try {
            const payments = splits.map(split => {
                const payment = {
                    amount: Math.round(split.valor * 100), // centavos
                    payment_method: this._mapMetodo(split.metodo),
                };

                if (split.metodo === 'cartao' && split.cardData) {
                    payment.credit_card = {
                        installments: split.parcelas || 1,
                        card: {
                            number: split.cardData.number,
                            holder_name: split.cardData.holder_name,
                            exp_month: parseInt(split.cardData.exp_month),
                            exp_year: parseInt(split.cardData.exp_year),
                            cvv: split.cardData.cvv,
                        },
                    };
                }

                if (split.metodo === 'boleto') {
                    payment.boleto = {
                        due_at: split.vencimento || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                    };
                }

                return payment;
            });

            const orderItems = items.map(item => ({
                amount: Math.round(item.valor * 100),
                description: item.descricao || 'Produto',
                quantity: 1,
            }));

            const body = {
                customer_id: customerId,
                items: orderItems,
                payments,
            };

            const { data } = await this.client.post('/orders', body);
            return [data, false];
        } catch (err) {
            console.error('[PagarMe] Erro ao criar order:', err.response?.data || err.message);
            return [err.response?.data || err.message, true];
        }
    }

    /**
     * Valida assinatura do webhook PagarMe.
     * @param {string|Buffer} rawBody
     * @param {string} signature - Header x-hub-signature
     * @returns {boolean}
     */
    validateSignature(rawBody, signature) {
        if (!this.webhookSecret || !signature) return false;
        const expected = crypto
            .createHmac('sha256', this.webhookSecret)
            .update(typeof rawBody === 'string' ? rawBody : rawBody.toString())
            .digest('hex');
        return `sha256=${expected}` === signature;
    }

    /**
     * Mapeia métodos internos para os do PagarMe.
     */
    _mapMetodo(metodo) {
        const map = {
            pix: 'pix',
            boleto: 'boleto',
            cartao: 'credit_card',
        };
        return map[metodo] || metodo;
    }
}
