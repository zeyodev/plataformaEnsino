import App from "../../../app"
import Card from "../../../components/atoms/card"
import { span } from "zeyo"
import { CRUDComponent } from "../../../components/organisms/CRUD"

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "produto": (v: any) => {
            ;(async () => {
                const [produto] = await app.repository.findOne("Produtos", { _id: v })
                if (produto) this.nome.text(produto.titulo || v)
            })()
        },
        "valor_total": (v: any) => {
            this.valor.text(`R$ ${Number(v).toFixed(2).replace(".", ",")}`)
        },
        "status": (v: any) => {
            const label = v || "ativo"
            this.statusEl.text(label.charAt(0).toUpperCase() + label.slice(1))
            this.statusEl.element.className = ""
            this.statusEl.class(
                label === "ativo" ? "tag-success" :
                label === "usado" ? "tag-warning" : "tag-danger"
            )
        },
        "link": (v: any) => {
            if (v) this.linkEl.text(v.substring(0, 20) + "...")
        },
    }
    nome = span()
    valor = span()
    statusEl = span().class("tag-success").text("Ativo")
    linkEl = span()
}).object(o => {
    o.linkEl.element.style.fontSize = "0.8em"
    o.linkEl.element.style.color = "var(--neutral-500)"
    o.children(o.nome, o.valor, o.statusEl, o.linkEl)
}).class("d-flex", "gap-m", "ai-center") as CRUDComponent
