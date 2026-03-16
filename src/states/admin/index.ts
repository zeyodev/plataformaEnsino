import State from ".."
import Context from "../context"
import Z from "zeyo"
import painelNav, { PainelNav } from "../../components/templates/painelNav"
import OptionAdminJornadas from "../../options/admin-jornadas"
import OptionAdminAulas from "../../options/admin-aulas"
import OptionAdminPilares from "../../options/admin-pilares"
import OptionAdminUsuarios from "../../options/admin-usuarios"
import OptionConfiguracoes from "../../options/configuracoes"

export default class Admin extends State {
    name = "admin"
    children: { [key: string]: new () => State } = {}
    options = {}
    painel: PainelNav = ({} as any)
    title = Z("h1")

    handle(context: Context): void {
        context.app.root.innerHTML = ""
        this.painel = painelNav(context.app)
        context.app.root.appendChild(this.painel.element)

        if (context.app.naoEstaAutenticado()) {
            return window.history.back()
        }
        (async () => {
            const accessToken = context.app.getAccessToken()!
            context.app.setSocket(accessToken)
            context.setOnconnect()
            await context.app.socket.waitSocket()

            this.painel.sideNav.setInfo([
                new OptionAdminJornadas(context.app),
                new OptionAdminAulas(context.app),
                new OptionAdminPilares(context.app),
                new OptionAdminUsuarios(context.app),
                new OptionConfiguracoes(context.app),
            ], (option) => {
                this.painel.subhandle(option)
            }, 0)
        })()
    }

    commands = {
        "voltar": async (context: Context) => {
            context.backState()
            context.forward()
        }
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("accessToken")
        if (!token) return false
        return true
    }
}
