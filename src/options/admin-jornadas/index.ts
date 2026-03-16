import Z, { div, h1, h3 } from "zeyo";
import Option from "..";
import App from "../../app";
import button from "../../components/atoms/button";

export default class OptionAdminJornadas extends Option {
    constructor(private app: App) {
        super("admin-jornadas", "Jornadas", "iconCompass", "admin-jornadas")
    }

    component = Z("div").class("d-grid", "gap-g", "ac-start", "p-10").children(
        h1("Gerenciar Jornadas"),
        div().class("d-grid", "gap-g").object(async container => {
            const [jornadas] = await this.app.repository.findMany("Jornadas", {})
            for (const jornada of jornadas) {
                container.children(
                    div().class("d-flex", "gap-g", "ai-center", "jc-between").children(
                        h3(jornada.titulo),
                        div().class("d-flex", "gap-m").children(
                            button("Editar").style("primary").click(() => {
                                this.app.socket.emit("db/update/Jornadas", jornada)
                            }),
                            button("Excluir").style("danger").click(() => {
                                this.app.socket.emit("db/delete/Jornadas", { _id: jornada._id })
                            }),
                        )
                    )
                )
            }
            // Fases
            const [fases] = await this.app.repository.findMany("Fases", {})
            container.children(h1("Fases"))
            for (const fase of fases) {
                container.children(
                    div().class("d-flex", "gap-g", "ai-center", "jc-between").children(
                        h3(fase.titulo),
                        div().class("d-flex", "gap-m").children(
                            button("Editar").style("primary"),
                            button("Excluir").style("danger").click(() => {
                                this.app.socket.emit("db/delete/Fases", { _id: fase._id })
                            }),
                        )
                    )
                )
            }
            // Etapas
            const [etapas] = await this.app.repository.findMany("Etapas", {})
            container.children(h1("Etapas"))
            for (const etapa of etapas) {
                container.children(
                    div().class("d-flex", "gap-g", "ai-center", "jc-between").children(
                        h3(etapa.titulo),
                        div().class("d-flex", "gap-m").children(
                            button("Editar").style("primary"),
                            button("Excluir").style("danger").click(() => {
                                this.app.socket.emit("db/delete/Etapas", { _id: etapa._id })
                            }),
                        )
                    )
                )
            }
        })
    );
}
