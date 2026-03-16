import Z, { div, h1, h3, p } from "zeyo";
import Option from "..";
import App from "../../app";
import button from "../../components/atoms/button";

export default class OptionAdminUsuarios extends Option {
    constructor(private app: App) {
        super("admin-usuarios", "Usuários", "iconUsers", "admin-usuarios")
    }

    component = Z("div").class("d-grid", "gap-g", "ac-start", "p-10").children(
        h1("Gerenciar Usuários"),
        div().class("d-grid", "gap-g").object(async container => {
            const [usuarios] = await this.app.repository.findMany("Usuarios", {})
            for (const usuario of usuarios) {
                container.children(
                    div().class("d-flex", "gap-g", "ai-center", "jc-between").children(
                        div().children(
                            h3(`${usuario.nome || ""} ${usuario.sobrenome || ""}`),
                            p(usuario.email || ""),
                        ),
                        div().class("d-flex", "gap-m").children(
                            button(usuario.role === "admin" ? "Admin" : "Usuário").style("primary"),
                            button("Excluir").style("danger").click(() => {
                                this.app.socket.emit("db/delete/Usuarios", { _id: usuario._id })
                            }),
                        )
                    )
                )
            }
        })
    );
}
