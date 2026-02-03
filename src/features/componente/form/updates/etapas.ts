import { div, object } from "zeyo";
import App from "../../../../app";
import Abas from "../../../../components/organisms/abas";
import Aba from "../../../../components/organisms/abas/aba";
import CRUD from "../../../../components/organisms/CRUD";
import FormUpdateComponente from "../update";
import FormFactoryCreateForm from "../../../formulario/form/factory/create";
import FormFactoryUpdateForm from "../../../formulario/form/factory/update";
import FormCreateAcao from "../../../acoes/form/create";
import FormUpdateAcao from "../../../acoes/form/update";
import FormLinkerAcao from "../../../acoes/form/linker";

export default (app: App, etapa: any) => new Abas(app)
    .push(new Aba("config", "Configuração", "iconSettings", new FormUpdateComponente(app, etapa), true))
    .push(new Aba("etapas", "Etapas", "iconInbox", div()).object(async a => {
        const [colecao] = await app.repository.findOne("Colecoes", { _id: etapa.colecao })
        const [formulario] = await app.repository.findOne("Formularios", { colecao: etapa.colecao })
        const [relacionamento] = await app.repository.findOne("Campos", { formulario: formulario._id, tipo: "relacionamento" })
        a.componente.children(new Abas(app)
            .push(new Aba("lista", "Lista", "iconList", CRUD(app, colecao.nome, { create: "Adicionar Etapa" }, {
                create: new FormFactoryCreateForm(app, formulario, etapa, colecao),
                read: { [relacionamento.key]: etapa._id },
                update: (app, obj) => new Abas(app)
                    .push(new Aba("config", "Configuração", "iconSettings", new FormFactoryUpdateForm(app, formulario, obj, colecao), true))
                    .push(new Aba("actions", "Ações", "iconPlay", CRUD(app, "Acoes", { create: "Adicionar Ação" }, {
                        // aqui tem que criar um lincador do componente com a acao
                        create: new FormCreateAcao(app, obj),
                        read: { pertence: obj._id },
                        update: (app, acao) => new FormUpdateAcao(app, acao),
                    }, { nome: "string" })))
            }, { nome: "string" }), true))
            .push(new Aba("acoes", "Ações", "iconPlay", div("Lista de acoes das etapas")))
        )
    }))