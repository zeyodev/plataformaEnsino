declare const process: { env: { [key: string]: string } }
import State from ".."
import Context from "../context"
import Z from "zeyo"
import painelNav, { PainelNav } from "../../components/templates/painelNav"
import Admin from "../admin"
import Produto from "../produto"
import OptionAmbientes from "../../options/ambientes"
import OptionConfiguracoes from "../../options/configuracoes"
import Aula from "../aula"

export default class Usuario extends State {
    name = "u"
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

            // Verifica com o servidor se o usuário é admin
            try {
                const serverUrl = (process.env.SERVER_URL as string) || window.location.origin
                const res = await fetch(`${serverUrl}/admin/verify`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                })
                const { isAdmin, usuario } = await res.json()

                // Guarda o id do usuario na sessão
                if (usuario?._id) {
                    context.app.session.usuarioId = usuario._id
                }

                if (isAdmin) {
                    context.setState(new Admin())
                    context.handle()
                    return
                }
            } catch (err) {
                console.log("Erro ao verificar admin:", err)
            }

            // Usuário normal: usa RepositoryHTTP para buscar dados do servidor
            context.app.setRepositoryHTTP()

            // Busca os produtos/ambientes que o usuário é membro
            const [membros] = await context.app.repository.findMany("Assinaturas", { usuario: context.app.session.usuarioId })
            const ativos = membros.filter((m: any) => !m.status || m.status === "ativa")

            // Se não há assinaturas ativas, bloqueia acesso
            if (ativos.length === 0) {
                this.painel.subhandle({ component: Z("div").class("d-grid", "gap-m", "p-g").children(
                    Z("h2").text("Acesso não disponível"),
                    Z("p").text("Você não possui nenhuma assinatura ativa. Entre em contato com o suporte.")
                ), title: "Sem acesso" } as any)
                return
            }

            // Se o usuário possui somente um produto, redireciona direto
            if (ativos.length === 1) {
                const [produto] = await context.app.repository.findOne("Produtos", { _id: ativos[0].produto })
                if (produto) {
                    context.setState(new Produto(produto))
                    context.handle()
                    return
                }
            }

            // Caso contrário, mostra lista de ambientes + configurações
            const optionAmbientes = new OptionAmbientes(context.app)
            optionAmbientes.setOnSelect((produto: any) => {
                context.setState(new Produto(produto))
                context.handle()
            })

            this.painel.sideNav.setInfo([
                optionAmbientes,
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
