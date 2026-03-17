import Z, { div } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import CRUD from "../../components/organisms/CRUD";
import FormCreateUsuario from "../../features/usuario/form/create";
import configuracaoUsuario from "../../features/usuario/ui/configuracao";

export default class OptionAdminUsuarios extends Option {
    constructor(private app: App) {
        super("admin-usuarios", "Usuários", "iconUsers", "admin-usuarios")
    }

    component = Z("div").class("d-grid", "gap-g", "ac-start", "p-10").children(
        new Abas(this.app)
            .push(new Aba("usuarios", "Usuários", "iconUsers",
                div().class("d-grid", "gap-g", "p-10").object(o => {
                    o.children(CRUD(this.app, "Usuarios", { create: "Criar Usuário" }, {
                        create: new FormCreateUsuario(this.app),
                        read: { role: "user" },
                        update: (app, obj) => configuracaoUsuario(app, obj)
                    }, { nome: "string", email: "string" }))
                }), true
            ))
            .push(new Aba("administradores", "Administradores", "iconShield",
                div().class("d-grid", "gap-g", "p-10").object(o => {
                    o.children(CRUD(this.app, "Usuarios", { create: "Criar Administrador" }, {
                        create: new FormCreateUsuario(this.app),
                        read: { role: "admin" },
                        update: (app, obj) => configuracaoUsuario(app, obj)
                    }, { nome: "string", email: "string" }))
                })
            ))
    );
}
