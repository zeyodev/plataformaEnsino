import { span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "usuario": (v: any) => {
            (async () => {
                const [user] = await app.repository.findOne("Usuarios", { _id: v })
                if (user) this.nome.text(user.nome || user.email || v)
            })()
        },
    }
    nome = span()
}).object(o => o.children(o.nome)).class("d-flex", "gap-m") as CRUDComponent
