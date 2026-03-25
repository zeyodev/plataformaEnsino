export default interface Cupom {
    _id: string
    codigo: string
    desconto_percentual?: number
    desconto_valor?: number
    validade: string
    usos_maximos: number
    usos_atuais: number
    status: "ativo" | "expirado"
}
