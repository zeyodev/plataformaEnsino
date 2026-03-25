import { span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "texto": (v: any) => this.texto.text(v),
        "data": (v: any) => this.data.text(v ? new Date(v).toLocaleDateString("pt-BR") : ""),
    }
    texto = span()
    data = span()
}).object(o => {
    o.data.element.style.color = "var(--neutral-500)"
    o.data.element.style.fontSize = "0.85em"
    o.children(o.texto, o.data)
}).class("d-flex", "gap-m", "jc-between") as CRUDComponent
