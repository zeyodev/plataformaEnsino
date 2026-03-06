import State from ".."
import Context from "../context"
import Z, { div, h2 } from "zeyo"
import Organizacao from "../../features/organizacao"
import painelNav, { PainelNav } from "../../components/templates/painelNav"
import OptionJornadas from "../../options/jornadas"
import OptionPilares from "../../options/pilares"
import Aula from "../aula"
import OptionEncontros from "../../options/encontros"

export default class Usuario extends State {
    name = "u"
    children: { [key: string]: new () => State } = {}
    options = {
        /* organizacoes: OptionOrganizacoes, */
    }
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
            // TODO: Refresh Token não está funcionando quando a sessao passa para o dia seguinte ao religar computador
            const { accessToken, refreshToken } = await context.app.refreshToken()
            this.painel.sideNav.setInfo([
                new OptionJornadas(context.app),
                new OptionPilares(context.app),
                new OptionEncontros(context.app),
            ], (option) => {
                this.painel.subhandle(option)
            }, 0)
            /* context.app.setSocket(accessToken, refreshToken)
            context.setOnconnect();
            await context.app.socket.waitSocket()
            context.app.setSyncronizer(context.app.repository, context.app.socket) */
        })();
    }
    
    commands = {
        "organizacao": async (context: Context, organizacao: Organizacao) => {
            
        },

        "assistir": async (context: Context, aula: any) => {
            console.log("abrindo aula", aula)
            context.setState(new Aula(aula)).handle()
        }
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("token")
        if (!token) return false;
        return true
    }
}