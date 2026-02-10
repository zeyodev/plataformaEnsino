export interface FormulaNode {
    type: string;
    param?: any; // Pode ser array, objeto ou primitivo
    nome?: string;
    variables?: Record<string, any>; // Variáveis locais da expressão
    formula?: FormulaNode; // Para nós do tipo 'expressao'
}

export type Context = Record<string, any>;