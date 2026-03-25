import App from "../../../app"
import Card from "../../../components/atoms/card"
import { span } from "zeyo"
import { CRUDComponent } from "../../../components/organisms/CRUD"

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "codigo": (v: any) => this.codigo.text(v),
        "desconto_percentual": (v: any) => {
            if (v) this.desconto.text(`${v}%`)
        },
        "desconto_valor": (v: any) => {
            if (v) this.desconto.text(`R$ ${Number(v).toFixed(2).replace(".", ",")}`)
        },
        "status": (v: any) => {
            const label = v || "ativo"
            this.statusEl.text(label.charAt(0).toUpperCase() + label.slice(1))
            this.statusEl.element.className = ""
            this.statusEl.class(label === "ativo" ? "tag-success" : "tag-danger")
        },
    }
    codigo = span()
    desconto = span()
    statusEl = span().class("tag-success").text("Ativo")
}).object(o => {
    o.desconto.element.style.fontWeight = "600"
    o.children(o.codigo, o.desconto, o.statusEl)
}).class("d-flex", "gap-m", "ai-center") as CRUDComponent
