import State from ".."
import OptionOrganizacoes from "../../options/organizacoes"
import Context from "../context"
import Z from "zeyo"
import Option from "../../options"
import StateOrganizacao from "../organizacao"
import Organizacao from "../../features/organizacao"
import App from "../../app"
import { ulid } from "ulid"
import SideNav from "../../components/organisms/sideNav"
import TemplatePainel from "../../components/molecules/painel"
import menubar from "../../components/atoms/menubar"

export default class Usuario extends State {
    name = "u"
    children: { [key: string]: new () => State } = {}
    options = {
        organizacoes: OptionOrganizacoes,
    }
    sideNav: SideNav = ({} as any)
    slot = Z("div")
    title = Z("h1")
    subhandle(option: Option) {
        this.title.text(option.title)
        this.slot.HTML("");
        this.slot.children(option.component.class("state-component"))
    }

    handle(context: Context): void {
        context.app.root.innerHTML = ""
        if (context.app.repository.idb.name !== "metaorg")
            context.app.repository.setDatabase("metaorg")
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
                                }),
                                this.title,
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
            context.app.setSocket(accessToken, refreshToken)
            context.setOnconnect();
            this.sideNav.setInfo([
                new OptionOrganizacoes(context.app),
            ], (option) => {
                //option.handle(context)
                this.subhandle(option)
            }, 0)
            await context.app.socket.waitSocket()
            context.app.setSyncronizer(context.app.repository, context.app.socket)
        })();
        context.app.socket.emit(`sairOrganizacao/${context.app.msgId()}`)
        context.entrouOrganizacao = false
    }
    
    commands = {
        "organizacao": async (context: Context, organizacao: Organizacao) => {
            // TODO: aqui tem que refazer o entrarorganização caso desconecte e conecte novamente
            const event = `entrarorganizacao/${context.app.msgId()}`
            
            context.entrouOrganizacao = true
            context.organizacao = organizacao
            context.app.socket.emit(event, { organizacao })
            context.app.repository.setDatabase(organizacao._id)
            context.setState(new StateOrganizacao(organizacao))
            context.handle()
            await context.app.socket.wait(event, 3000)
            // TODO: aqui tem que verificar se ja tem o database
            if(!context.app.repository.idb.db || !Array.from(context.app.repository.idb.db.objectStoreNames).length)
                context.app.synchronizer.setData()
            else
                context.app.synchronizer.initiateRecovery()
            //const [ access ] = await context.app.socket.wait(event)
            //caso o usuario nao tenha acesso a organizacao, apaga do local os dados da organizacao e depois redireciona para estado anterior
        },
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("token")
        if (!token) return false;
        return true
    }
}