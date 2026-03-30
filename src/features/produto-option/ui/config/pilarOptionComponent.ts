import { span } from "zeyo";
import App from "../../../../app";
import Card from "../../../../components/atoms/card";
import { CRUDComponent } from "../../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    titleSpan = span()
    propermap = {
        "pilar": (pilarId: string) => {
            app.repository.findOne("Pilares", { _id: pilarId }).then(([pilar]) => {
                if (pilar) this.titleSpan.text(pilar.titulo || "Sem título")
            })
        }
    }
}).object(o => o.children(o.titleSpan)).class("d-flex", "gap-m") as CRUDComponent
