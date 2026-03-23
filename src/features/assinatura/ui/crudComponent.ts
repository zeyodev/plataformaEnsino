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
    }
    nome = span()
}).object(o => o.children(o.nome)).class("d-flex", "gap-m") as CRUDComponent
