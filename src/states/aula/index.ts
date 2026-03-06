import State from ".."
import Context from "../context"
import Z, { div } from "zeyo"
import PainelNav from "../../components/templates/painelNav"
import button from "../../components/atoms/button"
import iconArrowLeft from "icons/src/business_and_online_icons/iconArrowLeft"
import OptionPlayer from "../../options/player"
import OptionArquivos from "../../options/arquivos"

export default class Aula extends State {
    name = "aula"
    children: { [key: string]: new () => State } = {}
    options = {}
    painel: PainelNav = ({} as any)
    title = Z("h1")

    constructor(private aula: any) {
        console.log(aula)
        super()
    }

    handle(context: Context): void {
        context.app.root.innerHTML = ""
        this.painel = new PainelNav(context.app, true)

        const btnVoltar = button().style("no-bg").children(
            iconArrowLeft()
        ).click(() => {
            context.backState()
            context.forward()
        })
        this.painel.toolbar.children(btnVoltar)

        context.app.root.appendChild(this.painel.element)

        if (context.app.naoEstaAutenticado()) {
            return window.history.back()
        }
        (async () => {
            await context.app.refreshToken()
            this.painel.sideNav.setInfo([
                new OptionPlayer(context.app, this.aula),
                new OptionArquivos(context.app, this.aula),
            ], (option) => {
                this.painel.subhandle(option)
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
