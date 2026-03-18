import Z, { div } from "zeyo";
import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import FormCreateAnotacao from "./formCreateAnotacao";
import FormCreateEvento from "./formCreateEvento";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("anotacoes", "Anotações", "iconEdit", div(), true))
        .push(new Aba("eventos", "Eventos", "iconCalendar", div()))
