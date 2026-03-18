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
        .push(new Aba("editar", "Editar Usuário", "iconUser", new FormUpdateUsuario(app, obj), true))
        .push(new Aba("jornadas", "Jornadas", "iconMap",
            CRUD(app, "Jornadas", { create: "Criar Jornada" }, {
                create: new FormCreateJornadaUsuario(app, obj._id),
                read: { usuario: obj._id },
                update: (a, j) => new FormUpdateJornada(a, j)
            }, jornadaComponent)
        ))
        .push(new Aba("dossie", "Dossiê", "iconFileText", dossie(app, obj)))
