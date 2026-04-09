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

    setInfo(options: Option[], cb: (option: Option) => void, selected?: number) {
        this.sideNav.setInfo(options, (opt) => {
            this.element.classList.remove(this.style.open)
            cb(opt)
        }, selected)
        return this
    }
}).object(o => {
    const mb = menubar()
    const overlay = Z("div").class(o.style.overlay)

    overlay.click(() => {
        o.element.classList.remove(o.style.open)
        mb.toggle()
    })

    o.children(
        overlay,
        Z("div").class(o.style.menu).children(
            o.sideNav = new SideNav(app, backoption).class(o.style.navigation),
        ),
        Z("div").class(o.style.main).object(main => {
            main.children(
                o.toolbar.class("d-flex", "gap-g", "p-10", "ai-center").children(
                    mb.click((m) => {
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
