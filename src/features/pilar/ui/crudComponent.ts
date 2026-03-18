import { Img, span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";
import icons from "../../../components/atoms/icons";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "icon": (v: any) => this.icon.HTML(icons(v).element.innerHTML),
        "titulo": (v: any) => this.titulo.text(v),
        "value": (v: any) => this.value.text(v)
    }
    icon = icons("iconActivity")
    titulo = span()
    value = span()
}).object(o => o.children(o.icon, o.titulo, o.value)).class("d-flex", "gap-m") as CRUDComponent