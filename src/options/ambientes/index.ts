import Z, { div, h1, h3, p } from "zeyo";
import Option from "..";
import App from "../../app";
import Card from "../../components/atoms/card";
import icons from "../../components/atoms/icons";

export default class OptionAmbientes extends Option {
    onSelect: (produto: any) => void = () => {}

    constructor(private app: App) {
        super("ambientes", "Meus Ambientes", "iconBox", "ambientes")
    }

    setOnSelect(cb: (produto: any) => void) {
        this.onSelect = cb
        return this
    }

    component = div().class("d-grid", "gap-g", "ac-start").children(
        h1(this.title),
        div().class("d-grid", "gap-m").object(async container => {
            const accessToken = this.app.getAccessToken()
            // Busca membros do usuário atual
            const [membros] = await this.app.repository.findMany("Assinaturas", { usuario: (this.app.session as any).usuarioId })
            const ativos = membros.filter((m: any) => !m.status || m.status === "ativa")
            for (const membro of ativos) {
                const [produto] = await this.app.repository.findOne("Produtos", { _id: membro.produto })
                if (!produto) continue
                const card = new Card().class("d-flex", "gap-g", "ai-center", "pointer").object(c => {
                    c.children(
                        typeof produto.icon === "string" ? icons((produto.icon as any)) : div(),
                        div().class("d-grid", "gap-p").children(
                            h3(produto.titulo),
                            p(produto.descricao || ""),
                        )
                    )
                    c.click(() => this.onSelect(produto))
                })
                container.children(card)
            }
            if (ativos.length === 0) {
                container.children(p("Você não está inscrito em nenhum ambiente."))
            }
        })
    );
}
