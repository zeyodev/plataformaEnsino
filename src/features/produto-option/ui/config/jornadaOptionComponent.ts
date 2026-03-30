import { span } from "zeyo";
import App from "../../../../app";
import Card from "../../../../components/atoms/card";
import { CRUDComponent } from "../../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    titleSpan = span()
    propermap = {
        "jornada": (jornadaId: string) => {
            app.repository.findOne("Jornadas", { _id: jornadaId }).then(([jornada]) => {
                if (jornada) this.titleSpan.text(jornada.titulo || "Sem título")
            })
        }
    }
}).object(o => o.children(o.titleSpan)).class("d-flex", "gap-m") as CRUDComponent
