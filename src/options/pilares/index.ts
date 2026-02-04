import Z, { div, h1 } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";

export default class OptionPilares extends Option {
    constructor(private app: App) {
        super("pilares", "Pilares Fundamentais", "iconBarChart", "pilares")
    }

    gotError = false;

    component = Z("div").class("gap-g", "ac-start").children(
        h1(this.title),
        new Abas(this.app).push(new Aba("lideranca", "Liderança", "iconUsers", div(
            "aqui tera um lista de varios videos"
        ), true))
            .push(new Aba("recepcao", "Recepção", "iconBell", div(
                "aqui tera um lista de varios videos"
            )))
            .push(new Aba("comercial", "Comercial", "iconMessageCircle", div(
                "aqui tera um lista de varios videos"
            )))
            .push(new Aba("financeiro", "Financeiro", "iconDollarSign", div(
                "aqui tera um lista de varios videos"
            )))
    );




}