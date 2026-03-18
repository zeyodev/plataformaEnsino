import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import FormUpdateModulo from "../form/update";
import FormCreateAulaModulo from "./formCreateAula";
import FormUpdateAula from "../../aula/form/update";
import aulaComponent from "../../aula/ui/crudComponent";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("editar", "Editar Módulo", "iconBook", new FormUpdateModulo(app, obj), true))
        .push(new Aba("aulas", "Aulas", "iconPlay",
            CRUD(app, "Aulas", { create: "Criar Aula" }, {
                create: new FormCreateAulaModulo(app, obj._id),
                read: { modulo: obj._id },
                update: (app, a) => new FormUpdateAula(app, a)
            }, aulaComponent)
        ))
