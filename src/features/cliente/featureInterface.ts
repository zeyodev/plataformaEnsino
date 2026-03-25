export default interface Cliente {
    _id: string
    nome: string
    email: string
    telefone: string
    cnpj?: string
    cep: string
    logradouro: string
    bairro?: string
    cidade: string
    estado: string
    pais: string
}
