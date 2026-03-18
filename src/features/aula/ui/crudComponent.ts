import { span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "title": (v: any) => this.title.text(v),
        "description": (v: any) => this.description.text(v)
    }
    title = span()
    description = span()
}).object(o => o.children(o.title, o.description)).class("d-flex", "gap-m") as CRUDComponent