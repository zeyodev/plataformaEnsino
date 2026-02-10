// 1. Definição de Dados (Mock Data)
const entradas = [
    { nome: "Salário", valor: 2500, data: "2026-01-05" },
    { nome: "Vale", valor: 600, data: "2026-01-20" }
];

const saidas = [
    { nome: "Aluguel", valor: 1350, data: "2026-01-10" },
    { nome: "Condominio", valor: 500, data: "2026-01-15" }
];

const collections: { [key: string]: any[] } = {
    Saidas: saidas,
    Entradas: entradas
};

// 4. Factory e Engine
export default class FormulaEngine {
    
    // Mapa de funções disponíveis
    static operations: { [key: string]: Function } = {
        sum: sum,
        sub: sub,
        find: findMany
        // 'expressao' é tratada internamente no execute
    };

    /**
     * Resolve variáveis que começam com $ (ex: "$dateRange")
     */
    static resolveVariable(value: any, context: Context): any {
        if (typeof value === 'string' && value.startsWith('$')) {
            const varName = value.substring(1); // remove o $
            // Remove o $ para buscar no contexto, mas se for $variableName, busca variableName
            // No seu objeto, a chave é "dateRange", mas na string é "$dataRange" (cuidado com typos)
            // Vou assumir que o nome da variável no contexto bate com o nome após o $
            return context[varName] !== undefined ? context[varName] : value;
        }
        return value;
    }

    /**
     * Função Principal Recursiva
     */
    static execute(node: any, context: Context = {}): any {
        // 1. Se for valor primitivo, retorna ele mesmo (resolvendo variável se necessário)
        if (typeof node !== 'object' || node === null) {
            return this.resolveVariable(node, context);
        }

        // 2. Se for Array, resolve cada item do array recursivamente
        if (Array.isArray(node)) {
            return node.map(item => this.execute(item, context));
        }

        // 3. Tratamento Especial: Tipo "expressao"
        // Ele define um escopo novo (variáveis) e tem uma 'formula' interna
        if (node.type === 'expressao') {
            // Merge do contexto atual com as variáveis novas desta expressão
            // Se variable for null, mantemos null, mas geralmente queremos passar valor
            
            // Resolvemos os valores das variáveis antes de passar para baixo? 
            // Geralmente variáveis de expressão são definições estáticas ou repasses.
            const localVariables = node.variables || {};
            const newContext = { ...context, ...localVariables };
            
            console.log(`> Executando Expressão: ${node.nome}`);
            return this.execute(node.formula, newContext);
        }

        // 4. Execução de Fórmulas Padrão (sum, sub, find)
        const operation = this.operations[node.type];
        
        if (!operation) {
            console.warn(`Operação desconhecida: ${node.type}`);
            return null;
        }

        // Resolvemos os parâmetros antes de executar a função (Eager evaluation)
        let resolvedParams;
        
        if (Array.isArray(node.param)) {
            // Se param é array, resolvemos cada item
            // Ex: sub(param: [nodeA, nodeB]) -> resolve A, resolve B -> [100, 50]
            resolvedParams = node.param.map((p: any) => this.execute(p, context));
        } else {
            // Se param é um único objeto ou valor
            resolvedParams = [this.execute(node.param, context)];
        }

        // Executa a função mapeada
        return operation(...resolvedParams);
    }
}

// Soma: aceita um array de números ou múltiplos argumentos numéricos
function sum(...args: any[]) {
    // Flattening caso venha [[10, 20]] ou [10, 20]
    const flatArgs = args.flat(Infinity);
    return flatArgs.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
}

// Subtração: Espera [valorA, valorB]
function sub(a: number, b: number) {
    return (Number(a) || 0) - (Number(b) || 0);
}

// Busca: Recebe (NomeColecao, Campo, DateRange?)
function findMany(collectionName: string, key: string, dateRange?: any) {
    const collection = collections[collectionName];
    if (!collection) return [];
    
    // Aqui poderíamos filtrar usando o dateRange se necessário
    if (dateRange) {
        console.log(`[LOG] Filtrando ${collectionName} com range:`, dateRange);
    }

    return collection.map(d => d[key]);
}