import Z from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import CRUD from "../../components/organisms/CRUD";
import FormCreatePilar from "../../features/pilar/form/create";
import configuracaoPilar from "../../features/pilar/ui/configuracao";
import pilarComponent from "../../features/pilar/ui/crudComponent";
import FormCreateModulo from "../../features/modulo/form/create";
import configuracaoModulo from "../../features/modulo/ui/configuracao";
import moduloComponent from "../../features/modulo/ui/crudComponent";
import abasAulas from "../../features/aula/ui/abasAulas";

export default class OptionAdminAulas extends Option {
    constructor(private app: App) {
        super("admin-aulas", "Conteúdo", "iconPlay", "admin-aulas")
    }

    component = Z("div").class("d-grid", "gap-g", "ac-start", "p-10").children(
        new Abas(this.app)
            .push(new Aba("pilares", "Pilares", "iconLayers",
                CRUD(this.app, "Pilares", { create: "Criar Pilar" }, {
                    create: new FormCreatePilar(this.app),
                    update: (app, obj) => configuracaoPilar(app, obj)
                }, pilarComponent), true
            ))
            .push(new Aba("modulos", "Módulos", "iconBook",
                CRUD(this.app, "Modulos", { create: "Criar Módulo" }, {
                    create: new FormCreateModulo(this.app),
                    update: (app, obj) => configuracaoModulo(app, obj)
                }, moduloComponent)
            ))
            .push(new Aba("aulas", "Aulas", "iconPlay",
                abasAulas(this.app)
            ))
    );
}
