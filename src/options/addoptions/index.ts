import Option from "..";
import App from "../../app";
import { div } from "zeyo";
import iconPlus from "lucideIcons/iconPlus";

export default (app: App) => (new class extends Option {
    colecoes = div().class("d-grid", "gap-m")
    constructor() {
        super("", "Adicionar Option", iconPlus(), "addOption")
    }
    component = div()
})