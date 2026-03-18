import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import FormUpdatePilar from "../form/update";
import FormCreateModuloPilar from "./formCreateModulo";
import configuracaoModulo from "../../modulo/ui/configuracao";
import moduloComponent from "../../modulo/ui/crudComponent";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("editar", "Editar Pilar", "iconLayers", new FormUpdatePilar(app, obj), true))
        .push(new Aba("modulos", "Módulos", "iconBook",
            CRUD(app, "Modulos", { create: "Criar Módulo" }, {
                create: new FormCreateModuloPilar(app, obj._id),
                read: { pilar: obj._id },
                update: (app, m) => configuracaoModulo(app, m)
            }, moduloComponent)
        ))
