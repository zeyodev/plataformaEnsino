export default interface Pagamento {
    _id: string
    checkoutLink: string
    cliente: string
    metodo: "pix" | "boleto" | "cartao"
    valor: number
    status: "pendente" | "pago" | "falhou" | "reembolsado"
    pagarme_id: string
    pagarme_order_id?: string
    criado_em: string
    pago_em?: string
    pix_qr_code?: string
    pix_qr_code_url?: string
    boleto_url?: string
    boleto_barcode?: string
}
