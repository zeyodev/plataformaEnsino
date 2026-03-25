export interface CheckoutSplit {
    metodo: "pix" | "boleto" | "cartao"
    valor: number
    parcelas?: number
}

export default interface CheckoutLink {
    _id: string
    produto: string
    splits: CheckoutSplit[]
    cupom?: string
    valor_total: number
    criado_por: string
    link: string
    status: "ativo" | "expirado" | "usado"
    validade?: string
}
