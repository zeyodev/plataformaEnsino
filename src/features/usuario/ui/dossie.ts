import Z, { div } from "zeyo";
import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import FormCreateAnotacao from "./formCreateAnotacao";
import FormCreateEvento from "./formCreateEvento";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("anotacoes", "Anotações", "iconEdit",
            div().class("d-grid", "gap-g", "p-10").object(o => {
                /* o.children(CRUD(app, "Anotacoes", { create: "Nova Anotação" }, {
                    create: new FormCreateAnotacao(app, obj._id),
                    read: { usuario: obj._id },
                }, { texto: "string", data: "date" })) */
            }), true
        ))
        .push(new Aba("eventos", "Eventos", "iconCalendar",
            div().class("d-grid", "gap-g", "p-10").object(o => {
               /*  o.children(CRUD(app, "Eventos", { create: "Registrar Evento" }, {
                    create: new FormCreateEvento(app, obj._id),
                    read: { usuario: obj._id },
                }, { tipo: "string", descricao: "string", data: "date" })) */
            })
        ))
