declare const process: { env: { [key: string]: string } }
import Z, { div, h1, h2, p } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import button from "../../components/atoms/button";
import FieldInput from "../../form/fields/input";
import icons from "../../components/atoms/icons";
import Root from "../../states/_root";

export default class OptionConfiguracoes extends Option {
    constructor(private app: App) {
        super("configuracoes", "Configurações", "iconSettings", "configuracoes")
    }

    component = div().class("d-grid", "gap-g", "ac-start").children(
        h1(this.title),
        new Abas(this.app).object(async abas => {
            // Aba 1: Informações do usuário
            const fieldNome = new FieldInput("nome", true).label("Nome")
            const fieldEmail = new FieldInput("email", true).label("Email")

            const btnSalvar = button("Salvar").style("accent").click(async () => {
                const nome = fieldNome.getValue()
                const email = fieldEmail.getValue()
                try {
                    const serverUrl = (process.env.SERVER_URL as string) || window.location.origin
                    const accessToken = this.app.getAccessToken()
                    await fetch(`${serverUrl}/usuario/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },
                        body: JSON.stringify({ nome, email })
                    })
                } catch (err) {
                    console.log("Erro ao salvar informações:", err)
                }
            })

            // Carrega dados do usuário
            try {
                const serverUrl = (process.env.SERVER_URL as string) || window.location.origin
                const accessToken = this.app.getAccessToken()
                const res = await fetch(`${serverUrl}/usuario/me`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                })
                if (res.ok) {
                    const usuario = await res.json()
                    if (usuario.nome) fieldNome.setValue(usuario.nome)
                    if (usuario.email) fieldEmail.setValue(usuario.email)
                }
            } catch (err) {
                console.log("Erro ao carregar informações do usuário:", err)
            }

            abas.push(new Aba("info", "Minha Conta", "iconUser",
                div().class("d-grid", "gap-g", "ac-start", "p-10").children(
                    h2("Informações Pessoais"),
                    fieldNome,
                    fieldEmail,
                    btnSalvar
                ), true
            ))

            // Aba 2: Logout
            const btnLogout = button("Sair da Conta").icon(icons("iconLogOut")).style("secondary").click(() => {
                this.app.limparTokens()
                window.location.href = "/"
            })

            abas.push(new Aba("sessao", "Sessão", "iconLogOut",
                div().class("d-grid", "gap-g", "ac-start", "p-10").children(
                    h2("Sessão"),
                    p("Clique no botão abaixo para sair da sua conta."),
                    btnLogout
                )
            ))
        })
    )
}
