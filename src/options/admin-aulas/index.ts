import Z, { div, h1, h3, p } from "zeyo";
import Option from "..";
import App from "../../app";
import button from "../../components/atoms/button";

export default class OptionAdminAulas extends Option {
    constructor(private app: App) {
        super("admin-aulas", "Aulas", "iconPlay", "admin-aulas")
    }

    component = Z("div").class("d-grid", "gap-g", "ac-start", "p-10").children(
        h1("Gerenciar Aulas"),
        div().class("d-grid", "gap-g").object(async container => {
            const [aulas] = await this.app.repository.findMany("Aulas", {})
            for (const aula of aulas) {
                if (!aula) continue
                container.children(
                    div().class("d-flex", "gap-g", "ai-center", "jc-between").children(
                        div().children(
                            h3(aula.title || "Sem título"),
                            p(aula.description || ""),
                        ),
                        div().class("d-flex", "gap-m").children(
                            button("Editar").style("primary").click(() => {
                                this.app.socket.emit("db/update/Aulas", aula)
                            }),
                            button("Excluir").style("danger").click(() => {
                                this.app.socket.emit("db/delete/Aulas", { _id: aula._id })
                            }),
                        )
                    )
                )
            }
        })
    );
}
