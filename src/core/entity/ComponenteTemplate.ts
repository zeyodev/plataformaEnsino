export default interface ComponenteTemplate {
    _id: string;
    titulo: string;
    tipo: string;
    campos: {[key: string]: string};
    compatibilidade: string,
    itens?: any
}