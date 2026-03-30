import App from "../../../../app";
import CRUD from "../../../../components/organisms/CRUD";
import FormVincularEncontros from "./formVincularEncontros";
import FormDesvincularEncontro from "./formDesvincularEncontro";
import encontroOptionComponent from "./encontroOptionComponent";

export default async (app: App, container: any, obj: any) => {
    container.children(
        CRUD(app, "ProdutoOptionEncontros", { create: "Vincular Categorias de Encontros" }, {
            create: new FormVincularEncontros(app, obj._id),
            read: { produtoOption: obj._id },
            update: (_app: App, item: any) => new FormDesvincularEncontro(_app, item)
        }, encontroOptionComponent)
    )
}
