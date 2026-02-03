import { div, h2 } from "zeyo";
import App from "../../../app";
import TemplatePainel from "../../molecules/painel";
//import SideNavDinamico from "../sideNav/dinamico";
import dinamico from "../sideNav/dinamico";
import database from "../../../options/database";
import headerBetween from "../../molecules/headerBetween";
import Option from "../../../options";
import menubar from "../../atoms/menubar";

export default (app: App) => (new class extends TemplatePainel {
    slot = div()
    header = headerBetween()
    subhandle(option: Option) {
        this.slot.HTML("");
        this.slot.children(option.component.class("state-component"))
        this.header.slot.HTML("");
        option.setHeader(this.header);
    }
}).object(o => o.children(
    div(
        dinamico(app, [
            database(app, ({} as any))
        ], (option) => {
            o.subhandle(option)
        }).class(o.style.navigation)
    ).class(o.style.menu),
    div(
        div(
            menubar().click((m) => {
                o.element.classList.toggle(o.style.open)
                m.toggle()
            }),
            o.header
        ).class("d-flex", "gap-g", "p-10"),
        o.slot.class(o.style.dash)
    ).class(o.style.main)
))