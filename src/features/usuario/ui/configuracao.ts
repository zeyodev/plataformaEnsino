import { div } from "zeyo";
import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import FormUpdateUsuario from "../form/update";
import FormUpdateJornada from "../../jornada/form/update";
import FormCreateJornadaUsuario from "./formCreateJornada";
import jornadaComponent from "../../jornada/ui/crudComponent";
import dossie from "./dossie";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("editar", "Editar Usuário", "iconUser",
            div().class("d-grid", "gap-g", "p-10").object(o => {
                o.children(new FormUpdateUsuario(app, obj))
            }), true
        ))
        .push(new Aba("jornadas", "Jornadas", "iconMap",
            div().class("d-grid", "gap-g", "p-10").object(o => {
                o.children(CRUD(app, "Jornadas", { create: "Criar Jornada" }, {
                    create: new FormCreateJornadaUsuario(app, obj._id),
                    read: { usuario: obj._id },
                    update: (a, j) => new FormUpdateJornada(a, j)
                }, jornadaComponent))
            })
        ))
        .push(new Aba("dossie", "Dossiê", "iconFileText",
            div().class("d-grid", "gap-g", "p-10").object(o => {
                o.children(dossie(app, obj))
            })
        ))
