import Z, { div, h1, h3 } from "zeyo";
import Option from "..";
import App from "../../app";
import button from "../../components/atoms/button";

export default class OptionAdminPilares extends Option {
    constructor(private app: App) {
        super("admin-pilares", "Pilares", "iconLayers", "admin-pilares")
    }

    component = Z("div").class("d-grid", "gap-g", "ac-start", "p-10").children(
        h1("Gerenciar Pilares"),
        div().class("d-grid", "gap-g").object(async container => {
            // Pilares
            const [pilares] = await this.app.repository.findMany("Pilares", {})
            for (const pilar of pilares) {
                container.children(
                    div().class("d-flex", "gap-g", "ai-center", "jc-between").children(
                        h3(pilar.titulo),
                        div().class("d-flex", "gap-m").children(
                            button("Editar").style("primary"),
                            button("Excluir").style("danger").click(() => {
                                this.app.socket.emit("db/delete/Pilares", { _id: pilar._id })
                            }),
                        )
                    )
                )
            }
            // Módulos
            const [modulos] = await this.app.repository.findMany("Modulos", {})
            container.children(h1("Módulos"))
            for (const modulo of modulos) {
                container.children(
                    div().class("d-flex", "gap-g", "ai-center", "jc-between").children(
                        h3(modulo.titulo),
                        div().class("d-flex", "gap-m").children(
                            button("Editar").style("primary"),
                            button("Excluir").style("danger").click(() => {
                                this.app.socket.emit("db/delete/Modulos", { _id: modulo._id })
                            }),
                        )
                    )
                )
            }
        })
    );
}
