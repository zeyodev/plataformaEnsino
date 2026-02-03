import Z, { Zeyo } from "zeyo";
import Page from ".";
import layout from "../component/layouts/layout.module.css";
import menubar from "../component/layouts/menubar.module.css";
export default class Painel extends Page {
    route: string = "/painel" // TODO: no futuro posso criar subpaginas que serao chamadas a partir dessa "/painel/#"
    title?: string | undefined;
    children?: Node[] | undefined;
    auth?: string | undefined;
    params?: { [key: string]: string; } | undefined;
    main: Zeyo = Z("div");
    async create(): Promise<Zeyo> {
        const layoutapp = new LayoutApp(this.app, new Menu(this.app))
        const cmenubar = Z("div").class(menubar.container).children(
            Z("div").class(menubar.bar1),
            Z("div").class(menubar.bar2),
            Z("div").class(menubar.bar3),
        )
        let changing = false
        return this.main = layoutapp.inner(
            Z("section").class("d-grid", "gap-g", layout.content).children(
                Z("header").class("d-flex", "gap-g", "a-center", "p-10").children(
                    cmenubar,
                    new StateTitle(this.app).watchSet(this.app.navigation).create(this.app.navigation)
                ).click(() => {
                    console.log("evandrozueda")
                    changing = true;
                    layoutapp.hide()
                    cmenubar.element.classList.toggle(menubar.change)
                }),
                Z("div").class(layout.dash).children(
                    await new StateComponent(this.app).watchSet(this.app.navigation).create(this.app.navigation)
                )
            ).clickevent((e) => {
                if (layoutapp.hidded && !changing) {
                    e.preventDefault()
                    layoutapp.hide()
                    cmenubar.element.classList.toggle(menubar.change)
                } else changing = false
            })
        )
    }
}
