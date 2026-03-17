import Z, { div } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import CRUD from "../../components/organisms/CRUD";
import FormCreatePilar from "../../features/pilar/form/create";
import configuracaoPilar from "../../features/pilar/ui/configuracao";
import FormCreateModulo from "../../features/modulo/form/create";
import configuracaoModulo from "../../features/modulo/ui/configuracao";
import FormCreateAula from "../../features/aula/form/create";
import FormUpdateAula from "../../features/aula/form/update";

export default class OptionAdminAulas extends Option {
    constructor(private app: App) {
        super("admin-aulas", "Conteúdo", "iconPlay", "admin-aulas")
    }

    component = Z("div").class("d-grid", "gap-g", "ac-start", "p-10").children(
        new Abas(this.app)
            .push(new Aba("pilares", "Pilares", "iconLayers",
                div().class("d-grid", "gap-g", "p-10").object(o => {
                    o.children(CRUD(this.app, "Pilares", { create: "Criar Pilar" }, {
                        create: new FormCreatePilar(this.app),
                        update: (app, obj) => configuracaoPilar(app, obj)
                    }, { titulo: "string", value: "string" }))
                }), true
            ))
            .push(new Aba("modulos", "Módulos", "iconBook",
                div().class("d-grid", "gap-g", "p-10").object(o => {
                    o.children(CRUD(this.app, "Modulos", { create: "Criar Módulo" }, {
                        create: new FormCreateModulo(this.app),
                        update: (app, obj) => configuracaoModulo(app, obj)
                    }, { titulo: "string" }))
                })
            ))
            .push(new Aba("aulas", "Aulas", "iconPlay",
                div().class("d-grid", "gap-g", "p-10").object(o => {
                    o.children(CRUD(this.app, "Aulas", { create: "Criar Aula" }, {
                        create: new FormCreateAula(this.app),
                        update: (app, obj) => new FormUpdateAula(app, obj)
                    }, { title: "string", description: "string" }))
                })
            ))
    );
}
