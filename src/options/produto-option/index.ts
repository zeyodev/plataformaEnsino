import App from "../../app";
import Option from "..";
import OptionPilaresProduto from "./pilares";
import OptionJornadasProduto from "./jornadas";
import OptionEncontrosProduto from "./encontros";
import OptionGenericoProduto from "./generico";

type ProdutoOptionStrategy = (app: App, produtoOption: any) => Option

const strategies: Record<string, ProdutoOptionStrategy> = {
    pilares:  (app, po) => new OptionPilaresProduto(app, po),
    jornadas: (app, po) => new OptionJornadasProduto(app, po),
    encontros:(app, po) => new OptionEncontrosProduto(app, po),
}

export function createOptionFromDB(app: App, produtoOption: any): Option {
    const strategy = strategies[produtoOption.tipo]
    if (strategy) return strategy(app, produtoOption)
    return new OptionGenericoProduto(app, produtoOption)
}
