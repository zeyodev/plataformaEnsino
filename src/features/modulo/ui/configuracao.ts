import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import FormUpdateModulo from "../form/update";
import FormVincularAulasModulo from "./formVincularAulasModulo";
import FormDesvincularAula from "./formDesvincularAula";
import aulaModuloComponent from "./aulaModuloComponent";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("editar", "Editar Módulo", "iconBook", new FormUpdateModulo(app, obj), true))
        .push(new Aba("aulas", "Aulas", "iconPlay",
            CRUD(app, "ModuloAulas", { create: "Vincular Aulas" }, {
                create: new FormVincularAulasModulo(app, obj._id),
                read: { modulo: obj._id },
                update: (app, a) => new FormDesvincularAula(app, a)
            }, aulaModuloComponent)
        ))
