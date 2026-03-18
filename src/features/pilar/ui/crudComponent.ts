import { span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "titulo": (v: any) => this.titulo.text(v),
        "value": (v: any) => this.value.text(v)
    }
    titulo = span()
    value = span()
}).object(o => o.children(o.titulo, o.value)).class("d-flex", "gap-m") as CRUDComponent