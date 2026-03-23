import Z from "zeyo";
import Option from "..";
import App from "../../app";
import CRUD from "../../components/organisms/CRUD";
import FormCreateProduto from "../../features/produto/form/create";
import configuracaoProduto from "../../features/produto/ui/configuracao";
import produtoComponent from "../../features/produto/ui/crudComponent";

export default class OptionAdminProdutos extends Option {
    constructor(private app: App) {
        super("admin-produtos", "Produtos", "iconBox", "admin-produtos")
    }

    component = Z("div").class("d-grid", "gap-g", "ac-start", "p-10").children(
        CRUD(this.app, "Produtos", { create: "Criar Produto" }, {
            create: new FormCreateProduto(this.app),
            update: (app, obj) => configuracaoProduto(app, obj)
        }, produtoComponent)
    );
}
