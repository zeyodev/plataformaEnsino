import State from ".."
import Context from "../context"
import Z, { div } from "zeyo"
import Option from "../../options"
import Organizacao from "../../features/organizacao"
import SideNav from "../../components/organisms/sideNav"
import TemplatePainel from "../../components/molecules/painel"
import menubar from "../../components/atoms/menubar"
import OptionPilares from "../../options/pilares"

export default class Usuario extends State {
    name = "u"
    children: { [key: string]: new () => State } = {}
    options = {
        /* organizacoes: OptionOrganizacoes, */
    }
    sideNav: SideNav = ({} as any)
    slot = Z("div")
    title = Z("h1")
    subhandle(option: Option) {
        this.slot.HTML("");
        this.slot.children(
            option.component.class("state-component")
        )
    }

    handle(context: Context): void {
        context.app.root.innerHTML = ""
        /* if (context.app.repository.idb.name !== "metaorg")
            context.app.repository.setDatabase("metaorg") */
        context.app.root.appendChild(
            new TemplatePainel().object(o => {
                o.children(
                    Z("div").class(o.style.menu).children(
                        // TODO: sidenav deveria ser criado dinamicamente
                        this.sideNav = new SideNav(context.app).class(o.style.navigation),
                    ),
                    Z("div").class(o.style.main).object(main => {
                        main.children(
                            Z("div").class("d-flex", "gap-g", "p-10").children(
                                menubar().click((m) => {
                                    o.element.classList.toggle(o.style.open)
                                    m.toggle()
                                })
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
            // TODO: Refresh Token não está funcionando quando a sessao passa para o dia seguinte ao religar computador
            const { accessToken, refreshToken } = await context.app.refreshToken()
            this.sideNav.setInfo([
                new OptionPilares(context.app),
            ], (option) => {
                //option.handle(context)
                this.subhandle(option)
            }, 0)
            /* context.app.setSocket(accessToken, refreshToken)
            context.setOnconnect();
            await context.app.socket.waitSocket()
            context.app.setSyncronizer(context.app.repository, context.app.socket) */
        })();
        context.app.socket.emit(`sairOrganizacao/${context.app.msgId()}`)
        context.entrouOrganizacao = false
    }
    
    commands = {
        "organizacao": async (context: Context, organizacao: Organizacao) => {
            
        },
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("token")
        if (!token) return false;
        return true
    }
}