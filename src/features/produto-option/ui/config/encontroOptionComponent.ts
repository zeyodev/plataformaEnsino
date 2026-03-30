import { span } from "zeyo";
import App from "../../../../app";
import Card from "../../../../components/atoms/card";
import { CRUDComponent } from "../../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    titleSpan = span()
    propermap = {
        "categoriaEncontro": (categoriaId: string) => {
            app.repository.findOne("CategoriasEncontros", { _id: categoriaId }).then(([categoria]) => {
                if (categoria) this.titleSpan.text(categoria.titulo || "Sem título")
            })
        }
    }
}).object(o => o.children(o.titleSpan)).class("d-flex", "gap-m") as CRUDComponent
