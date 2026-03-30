import Z, { h1 } from "zeyo";
import Option from "..";
import App from "../../app";

export default class OptionGenericoProduto extends Option {
    component: any

    constructor(private app: App, produtoOption: any) {
        super(produtoOption._id, produtoOption.nome, produtoOption.icon, produtoOption._id)
        this.component = Z("div").class("gap-g", "ac-start").children(
            h1(produtoOption.nome),
        )
    }
}
