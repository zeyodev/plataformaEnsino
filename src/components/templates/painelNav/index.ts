import Z from "zeyo"
import App from "../../../app"
import Option from "../../../options"
import SideNav from "../../organisms/sideNav"
import TemplatePainel from "../../molecules/painel"
import menubar from "../../atoms/menubar"
import SearchInput from "../../atoms/searchInput"

export default class PainelNav extends TemplatePainel {
    sideNav: SideNav = ({} as SideNav)
    slot = Z("div")
    toolbar = Z("div")
    search = new SearchInput()

    constructor(app: App, backoption?: boolean) {
        super()
        this.object(o => {
            o.children(
                Z("div").class(o.style.menu).children(
                    this.sideNav = new SideNav(app, backoption).class(o.style.navigation),
                ),
                Z("div").class(o.style.main).object(main => {
                    main.children(
                        this.toolbar.class("d-flex", "gap-g", "p-10", "ai-center").children(
                            menubar().click((m) => {
                                o.element.classList.toggle(o.style.open)
                                m.toggle()
                            }),
                            this.search,
                        ),
                        this.slot.class(o.style.dash)
                    )
                }),
            )
        })
    }

    subhandle(option: Option) {
        this.slot.HTML("")
        this.slot.children(
            option.component.class("state-component")
        )
    }
}
