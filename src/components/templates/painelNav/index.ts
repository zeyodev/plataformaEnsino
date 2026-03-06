import Z, { div } from "zeyo"
import App from "../../../app"
import Option from "../../../options"
import SideNav from "../../organisms/sideNav"
import TemplatePainel from "../../molecules/painel"
import menubar from "../../atoms/menubar"
import searchInput from "../../atoms/searchInput"
import Modal from "../../../states/Modal"
import modal from "../../molecules/modal"

const painelNav = (app: App, backoption?: boolean) => (new class PainelNav extends TemplatePainel {
    sideNav: SideNav = ({} as SideNav)
    slot = Z("div")
    toolbar = Z("div")
    search = searchInput(app).setPlaceholder()

    subhandle(option: Option) {
        this.slot.HTML("")
        this.slot.children(
            option.component.class("state-component")
        )
    }
}).object(o => {
    o.children(
        Z("div").class(o.style.menu).children(
            o.sideNav = new SideNav(app, backoption).class(o.style.navigation),
        ),
        Z("div").class(o.style.main).object(main => {
            main.children(
                o.toolbar.class("d-flex", "gap-g", "p-10", "ai-center").children(
                    menubar().click((m) => {
                        o.element.classList.toggle(o.style.open)
                        m.toggle()
                    }),
                    o.search,
                ),
                o.slot.class(o.style.dash)
            )
        }),
    )
})

export default painelNav
export type PainelNav = ReturnType<typeof painelNav>
