import App from "../../../../app";
import CRUD from "../../../../components/organisms/CRUD";
import FormVincularPilares from "./formVincularPilares";
import FormDesvincularPilar from "./formDesvincularPilar";
import pilarOptionComponent from "./pilarOptionComponent";

export default async (app: App, container: any, obj: any) => {
    container.children(
        CRUD(app, "ProdutoOptionPilares", { create: "Vincular Pilares" }, {
            create: new FormVincularPilares(app, obj._id),
            read: { produtoOption: obj._id },
            update: (_app: App, item: any) => new FormDesvincularPilar(_app, item)
        }, pilarOptionComponent)
    )
}
