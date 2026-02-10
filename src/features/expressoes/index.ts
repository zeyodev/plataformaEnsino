export default class Expressao {
    public propriedade?: string
    constructor(
        public _id: string,
        public titulo: string,
        public tipo: string,
        public icon: string,
        public nicho: string,
        public colecao: string,
        public alvo: string,
        public relacionamento: string,
    ) { }
}