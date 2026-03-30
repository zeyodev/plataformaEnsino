import App from "../../../../app";
import CRUD from "../../../../components/organisms/CRUD";
import FormVincularJornadas from "./formVincularJornadas";
import FormDesvincularJornada from "./formDesvincularJornada";
import jornadaOptionComponent from "./jornadaOptionComponent";

export default async (app: App, container: any, obj: any) => {
    container.children(
        CRUD(app, "ProdutoOptionJornadas", { create: "Vincular Jornadas" }, {
            create: new FormVincularJornadas(app, obj._id),
            read: { produtoOption: obj._id },
            update: (_app: App, item: any) => new FormDesvincularJornada(_app, item)
        }, jornadaOptionComponent)
    )
}
