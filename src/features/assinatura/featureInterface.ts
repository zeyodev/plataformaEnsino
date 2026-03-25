export default interface Assinatura {
    _id: string
    usuario: string
    produto: string
    status: "ativa" | "inativa" | "suspensa"
}
