import { div } from "zeyo";
import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import FormUpdateProdutoOption from "../form/update";
import configPilares from "./config/pilares";
import configJornadas from "./config/jornadas";
import configEncontros from "./config/encontros";

type ConfigHandler = (app: App, container: any, obj: any) => Promise<void>

const tiposConfig: Record<string, ConfigHandler> = {
    pilares: configPilares,
    jornadas: configJornadas,
    encontros: configEncontros,
}

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("editar", "Editar Option", "iconSettings", new FormUpdateProdutoOption(app, obj), true))
        .push(new Aba("config", "Configuração", "iconLayers",
            div().class("d-grid", "gap-g", "ac-start", "p-10").object(async container => {
                const handler = tiposConfig[obj.tipo]
                if (handler) await handler(app, container, obj)
            })
        ))
