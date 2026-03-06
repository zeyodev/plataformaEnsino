import Z, { div, h1, p } from "zeyo";
import Option from "..";
import App from "../../app";

export default class OptionArquivos extends Option {
    constructor(private app: App, private aula: any) {
        super("arquivos", "Arquivos", "iconFileText", "arquivos")
    }

    component = Z("div").class("gap-g", "ac-start").children(
        h1(this.title),
        p("Nenhum arquivo complementar disponível para esta aula."),
    );
}
