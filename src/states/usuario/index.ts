declare const process: { env: { [key: string]: string } }
import State from ".."
import Context from "../context"
import Z, { div, h2 } from "zeyo"
import painelNav, { PainelNav } from "../../components/templates/painelNav"
import OptionJornadas from "../../options/jornadas"
import OptionPilares from "../../options/pilares"
import Aula from "../aula"
import Admin from "../admin"
import OptionEncontros from "../../options/encontros"
import OptionConfiguracoes from "../../options/configuracoes"

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
            const accessToken = context.app.getAccessToken()!

            // Verifica com o servidor se o usuário é admin
            try {
                const serverUrl = (process.env.SERVER_URL as string) || window.location.origin
                const res = await fetch(`${serverUrl}/admin/verify`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                })
                const { isAdmin } = await res.json()
                if (isAdmin) {
                    context.setState(new Admin())
                    context.handle()
                    return
                }
            } catch (err) {
                console.log("Erro ao verificar admin:", err)
            }

            this.painel.sideNav.setInfo([
                new OptionJornadas(context.app),
                new OptionPilares(context.app),
                new OptionEncontros(context.app),
                new OptionConfiguracoes(context.app),
            ], (option) => {
                this.painel.subhandle(option)
            }, 0)
        })();
    }

    commands = {

        "assistir": async (context: Context, aula: any) => {
            console.log("abrindo aula", aula)
            context.setState(new Aula(aula)).handle()
        }
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("accessToken")
        if (!token) return false;
        return true
    }
}
