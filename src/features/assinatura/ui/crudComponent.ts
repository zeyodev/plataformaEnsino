import { span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "produto": (v: any) => {
            (async () => {
                const [produto] = await app.repository.findOne("Produtos", { _id: v })
                if (produto) this.nome.text(produto.titulo || v)
            })()
        },
        "status": (v: any) => {
            const label = v || "ativa"
            this.statusEl.text(label.charAt(0).toUpperCase() + label.slice(1))
            this.statusEl.element.className = ""
            this.statusEl.class(label === "ativa" ? "tag-success" : label === "suspensa" ? "tag-warning" : "tag-danger")
        },
    }
    nome = span()
    statusEl = span().class("tag-success").text("Ativa")
}).object(o => o.children(o.nome, o.statusEl)).class("d-flex", "gap-m", "ai-center") as CRUDComponent
