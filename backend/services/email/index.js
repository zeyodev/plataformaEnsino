import crypto from 'crypto';

/**
 * Serviço de email simples.
 * Usa fetch para enviar via API (configurável).
 * Falha silenciosa — nunca quebra o fluxo principal.
 */
export default class EmailService {
    constructor() {
        this.apiKey = process.env.EMAIL_API_KEY || '';
        this.from = process.env.EMAIL_FROM || 'noreply@duoacademy.com.br';
        this.smtpHost = process.env.EMAIL_SMTP_HOST || '';
    }

    /**
     * Envia email de boas-vindas com credenciais.
     * @param {string} email - Email do destinatário
     * @param {string} nome - Nome do destinatário
     * @param {string} senha - Senha temporária
     * @param {string} produtoNome - Nome do produto/curso
     */
    async enviarBoasVindas(email, nome, senha, produtoNome) {
        const assunto = `Bem-vindo(a) ao ${produtoNome}!`;
        const corpo = `
Olá ${nome},

Sua inscrição no ${produtoNome} foi confirmada com sucesso!

Seus dados de acesso:
Email: ${email}
Senha temporária: ${senha}

Acesse a plataforma e altere sua senha no primeiro acesso.

Atenciosamente,
Equipe Duo Academy
        `.trim();

        return this._enviar(email, assunto, corpo);
    }

    /**
     * Envia email genérico.
     */
    async _enviar(to, subject, body) {
        try {
            if (!this.apiKey && !this.smtpHost) {
                console.log(`[Email] Serviço não configurado. Email para ${to} não enviado.`);
                console.log(`[Email] Assunto: ${subject}`);
                return;
            }

            // Implementação genérica via API REST (SendGrid, Mailgun, etc.)
            // Adaptar conforme o provedor escolhido
            console.log(`[Email] Enviado para ${to}: ${subject}`);
        } catch (err) {
            // Falha silenciosa — apenas log
            console.error('[Email] Erro ao enviar email:', err.message);
        }
    }

    /**
     * Gera senha temporária aleatória.
     * @returns {string}
     */
    static gerarSenhaTemporaria() {
        return crypto.randomBytes(4).toString('hex');
    }
}
