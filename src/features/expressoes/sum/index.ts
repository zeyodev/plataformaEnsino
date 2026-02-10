import Expressao from "..";

export default // Soma: aceita um array de números ou múltiplos argumentos numéricos
function sum(...args: any[]) {
    // Flattening caso venha [[10, 20]] ou [10, 20]
    const flatArgs = args.flat(Infinity);
    return flatArgs.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
}