import State from ".."
import Context from "../context"
import Z from "zeyo"
import painelNav, { PainelNav } from "../../components/templates/painelNav"
import OptionConfiguracoes from "../../options/configuracoes"
import { createOptionFromDB } from "../../options/produto-option-factory"
import Aula from "../aula"

export default class Produto extends State {
    name = "produto"
    children: { [key: string]: new () => State } = {}
    options = {}
    painel: PainelNav = ({} as any)
    title = Z("h1")

    constructor(private produto: any) {
        super()
    }

    handle(context: Context): void {
        context.app.root.innerHTML = ""
        this.painel = painelNav(context.app, true)
        context.app.root.appendChild(this.painel.element)

        if (context.app.naoEstaAutenticado()) {
            return window.history.back()
        }

        (async () => {
            const [produtoOptions] = await context.app.repository.findMany("ProdutoOptions", { produto: this.produto._id })
            // Ordena por ordem
            produtoOptions.sort((a: any, b: any) => (a.ordem || 0) - (b.ordem || 0))

            const options = produtoOptions.map((po: any) => createOptionFromDB(context.app, po))
            options.push(new OptionConfiguracoes(context.app))

            this.painel.sideNav.setInfo(options, (option) => {
                this.painel.subhandle(option)
            }, 0)
        })()
    }

    commands = {
        "assistir": async (context: Context, aula: any) => {
            context.setState(new Aula(aula)).handle()
        }
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("accessToken")
        if (!token) return false
        return true
    }
}
