import { span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";
import icons from "../../../components/atoms/icons";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "icon": (v: any) => this.icon.HTML(icons(v).element.innerHTML),
        "nome": (v: any) => this.nome.text(v),
        "tipo": (v: any) => this.tipo.text(v),
        "ordem": (v: any) => this.ordem.text(String(v))
    }
    icon = icons("iconActivity")
    nome = span()
    tipo = span()
    ordem = span()
}).object(o => o.children(o.icon, o.nome, o.tipo, o.ordem)).class("d-flex", "gap-m") as CRUDComponent
