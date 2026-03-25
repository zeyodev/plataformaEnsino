import { span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "tipo": (v: any) => this.tipo.text(v),
        "descricao": (v: any) => this.descricao.text(v),
        "data": (v: any) => this.data.text(v ? new Date(v).toLocaleDateString("pt-BR") : ""),
    }
    tipo = span()
    descricao = span()
    data = span()
}).object(o => {
    o.tipo.element.style.fontWeight = "600"
    o.tipo.element.style.textTransform = "capitalize"
    o.data.element.style.color = "var(--neutral-500)"
    o.data.element.style.fontSize = "0.85em"
    o.children(o.tipo, o.descricao, o.data)
}).class("d-flex", "gap-m") as CRUDComponent
