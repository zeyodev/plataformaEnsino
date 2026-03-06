import State from ".."
import Context from "../context"
import Z, { div } from "zeyo"
import Option from "../../options"
import SideNav from "../../components/organisms/sideNav"
import TemplatePainel from "../../components/molecules/painel"
import menubar from "../../components/atoms/menubar"
import button from "../../components/atoms/button"
import iconArrowLeft from "icons/src/business_and_online_icons/iconArrowLeft"
import OptionPlayer from "../../options/player"
import OptionArquivos from "../../options/arquivos"

export default class Aula extends State {
    name = "aula"
    children: { [key: string]: new () => State } = {}
    options = {}
    sideNav: SideNav = ({} as any)
    slot = Z("div")
    title = Z("h1")
    subhandle(option: Option) {
        this.slot.HTML("");
        this.slot.children(
            option.component.class("state-component")
        )
    }

    constructor(private aula: any) {
        console.log(aula)
        super()
    }

    handle(context: Context): void {
        context.app.root.innerHTML = ""

        const btnVoltar = button().style("no-bg").children(
            iconArrowLeft()
        ).click(() => {
            context.backState()
            context.forward()
        })

        context.app.root.appendChild(
            new TemplatePainel().object(o => {
                o.children(
                    Z("div").class(o.style.menu).children(
                        this.sideNav = new SideNav(context.app, true).class(o.style.navigation),
                    ),
                    Z("div").class(o.style.main).object(main => {
                        main.children(
                            Z("div").class("d-flex", "gap-g", "p-10", "ai-center").children(
                                menubar().click((m) => {
                                    o.element.classList.toggle(o.style.open)
                                    m.toggle()
                                }),
                                btnVoltar,
                            ),
                            this.slot.class(o.style.dash)
                        )
                    }),
                )
            }).element
        )

        if (context.app.naoEstaAutenticado()) {
            return window.history.back()
        }
        (async () => {
            await context.app.refreshToken()
            this.sideNav.setInfo([
                new OptionPlayer(context.app, this.aula),
                new OptionArquivos(context.app, this.aula),
            ], (option) => {
                this.subhandle(option)
            }, 0)
        })();
        context.app.socket.emit(`sairOrganizacao/${context.app.msgId()}`)
        context.entrouOrganizacao = false
    }

    commands = {
        "assistir": async (context: Context, aula: any) => {
            console.log("abrindo aula", aula)
        }
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("token")
        if (!token) return false;
        return true
    }
}
