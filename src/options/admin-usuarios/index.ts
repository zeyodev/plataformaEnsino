import Z from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import CRUD from "../../components/organisms/CRUD";
import FormCreateUsuario from "../../features/usuario/form/create";
import configuracaoUsuario from "../../features/usuario/ui/configuracao";
import usuarioComponent from "../../features/usuario/ui/crudComponent";

export default class OptionAdminUsuarios extends Option {
    constructor(private app: App) {
        super("admin-usuarios", "Usuários", "iconUsers", "admin-usuarios")
    }

    component = Z("div").class("d-grid", "gap-g", "ac-start", "p-10").children(
        new Abas(this.app)
            .push(new Aba("usuarios", "Usuários", "iconUsers",
                CRUD(this.app, "Usuarios", { create: "Criar Usuário" }, {
                    create: new FormCreateUsuario(this.app),
                    read: { role: "user" },
                    update: (app, obj) => configuracaoUsuario(app, obj)
                }, usuarioComponent), true
            ))
            .push(new Aba("administradores", "Administradores", "iconShield",
                CRUD(this.app, "Usuarios", { create: "Criar Administrador" }, {
                    create: new FormCreateUsuario(this.app),
                    read: { role: "admin" },
                    update: (app, obj) => configuracaoUsuario(app, obj)
                }, usuarioComponent)
            ))
    );
}
