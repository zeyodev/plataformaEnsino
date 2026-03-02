import Z, { div, h1 } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import ComponenteEngine from "../../features/componente/engine";

export default class OptionJornadas extends Option {
    constructor(private app: App) {
        super("jornadas", "Jornadas", "iconCompass", "jornadas")
    }

    gotError = false;

    component = Z("div").class("gap-g", "ac-start").children(
        h1(this.title),
    );
}
