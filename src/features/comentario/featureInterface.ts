export default interface AulaComentario {
    _id: string
    aulaId: string
    autorId: string
    autorNome: string
    texto: string
    likes: string[]
    criadoEm: string
    editadoEm?: string
}
