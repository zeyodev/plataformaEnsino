import { span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";
import icons from "../../../components/atoms/icons";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "icon": (v: any) => this.icon.HTML(icons(v).element.innerHTML),
        "titulo": (v: any) => this.titulo.text(v),
        "descricao": (v: any) => this.descricao.text(v)
    }
    icon = icons("iconActivity")
    titulo = span()
    descricao = span()
}).object(o => o.children(o.icon, o.titulo, o.descricao)).class("d-flex", "gap-m") as CRUDComponent
