export default interface Encontro {
    _id: string
    categoriaEncontro: string
    titulo: string
    descricao: string
    data: string
    meet_link: string
    status: "agendado" | "em_andamento" | "encerrado"
}
