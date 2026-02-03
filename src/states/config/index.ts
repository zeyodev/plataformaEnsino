import State from ".."
import OptionOrganizacoes from "../../options/organizacoes"
import Context from "../context"
import Z from "zeyo"
import SideNav from "../../component1.1/organisms/sideNav"
import OptionAmbientes from "../../options/ambientes"
import TemplatePainel from "../../component1.1/templates/painel"
import MenuBar from "../../component1.1/atoms/menubar"
import Option from "../../options"
import Organizacao from "../../features/organizacao"
import Ambiente from "../../features/ambiente"
import StateAmbiente from "../ambiente"
import database from "../../options/database"

export default class StateConfiguracao extends State {
    name = "organizacao"
    children: { [key: string]: new () => State } = {}
    options = {
        organizacoes: OptionOrganizacoes,
    }
    slot = Z("div")
    title = Z("h1")
    subhandle(option: Option) {
        this.title.text(option.title)
        this.slot.HTML("");
        this.slot.children(option.component.class("state-component"))
    }
    
    constructor(private organizacao: Organizacao) {
        super()
    }

    handle(context: Context): void {
        context.app.root.innerHTML = ""
        context.app.root.appendChild(
            new TemplatePainel(context.app).object(o => {
                o.children(
                    Z("div").class(o.style.menu).children(
                        new SideNav(context.app).class(o.style.navigation).setInfo([
                            database(context.app, this.organizacao),
                        ], (option) => {
                            this.subhandle(option)
                        }, 0),
                    ),
                    Z("div").class(o.style.main).object(main => {
                        main.children(
                            Z("div").class("d-flex", "gap-g", "p-10").children(
                                new MenuBar().click((m) => {
                                    o.element.classList.toggle(o.style.open)
                                    m.toggle()
                                }),
                                this.title,
                            ),
                            this.slot.class(o.style.dash)
                        )
                    }),
                )
            }).element
        )
    }

    commands = {
        "ambiente": (context: Context, ambiente: Ambiente) => {
            context.setState(new StateAmbiente(ambiente))
            context.handle()
        },
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("token")
        if (!token) return false;
        return true
    }
}