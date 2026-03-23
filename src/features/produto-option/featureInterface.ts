export default interface ProdutoOption {
    _id: string
    produto: string
    tipo: string   // "pilares" | "jornadas" | "encontros" | custom
    nome: string
    icon: string
    config: any    // configuração específica do tipo, ex: { pilares: ["id1", "id2"] }
    ordem: number
}
