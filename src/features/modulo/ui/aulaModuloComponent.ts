import { span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    titleSpan = span()
    descriptionSpan = span()
    propermap = {
        "aula": (aulaId: string) => {
            app.repository.findOne("Aulas", { _id: aulaId }).then(([aula]) => {
                if (aula) {
                    this.titleSpan.text(aula.title || "Sem título")
                    this.descriptionSpan.text(aula.description || "")
                }
            })
        }
    }
}).object(o => o.children(o.titleSpan, o.descriptionSpan)).class("d-flex", "gap-m") as CRUDComponent
