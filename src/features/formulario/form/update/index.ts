import { div } from "zeyo";
import App from "../../../../app";
import Abas from "../../../../components/organisms/abas";
import Aba from "../../../../components/organisms/abas/aba";
import CRUD from "../../../../components/organisms/CRUD";
import FormUpdateCampo from "../../campo/form/update";
import FormUpdateVinculoCampo from "../../campo/form/updateVinculo";
import FormVinculaCampo from "../../campo/form/vincula";
import FormUpdateFormulario from "./config";

export default (app: App, formulario: any) => new Abas(app)
.push(new Aba("config", "Configuração", "iconSettings", new FormUpdateFormulario(app, formulario), true))
.push(new Aba("fields", "Campos", "iconSquare", CRUD(app, "CamposFormulario", {create: "Vincular Campo"}, {
    create: new FormVinculaCampo(app, "", formulario),
    read: {formulario: formulario._id},
    update: (app, vinculo) => new Abas(app)
        .push(new Aba("vinculo", "Vinculo", "iconLink", new FormUpdateVinculoCampo(app, vinculo), true))
        .push(new Aba("campo", "Campo", "iconSquare", div()).object(async o => {
            const [campo] = await app.repository.findOne("Campos", {_id: vinculo.campo})
            o.componente.children(new FormUpdateCampo(app, campo))
        }))
}, {"campo/Campos.key": "string", "campo/Campos.tipo": "string", "campo/Campos.placeholder": "string"})))
