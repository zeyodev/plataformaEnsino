import { span, Div } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "nome": (v: any) => this.nome.text(v),
        "email": (v: any) => this.email.text(v)
    }
    nome = span()
    email = span()
}).object(o => o.children(o.nome, o.email)).class("d-flex", "gap-m") as CRUDComponent