import iconDatabase from "icons/src/business_and_online_icons/iconDatabase";
import Option from "..";
import App from "../../app";
import { div } from "zeyo";
import FormCreateCollection from "../../features/collection/form/create";
import CRUD from "../../components/organisms/CRUD";
import FormUpdateCollection from "../../features/collection/form/update";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import FormCreatePropriedade from "../../features/propriedade/form/create";
import FormUpdatePropriedade from "../../features/propriedade/form/update";
import FormFormulario from "../../features/formulario/form/create";
import update from "../../features/formulario/form/update";
import FormFactoryCreateForm from "../../features/formulario/form/factory/create";
import nodes from "./sync/nodes";
import Organizacao from "../../features/organizacao";

export default (app: App, organizacao: Organizacao) => (new class extends Option {
    colecoes = div().class("d-grid", "gap-m")
    constructor() {
        super("", "Base de Dados", iconDatabase(), "database")
    }
    component = new Abas(app)
        .push(new Aba("local", "Dados Locais", "iconArchive", CRUD(app, "Colecoes", { create: "Cria Coleção" }, {
            create: new FormCreateCollection(app, {}),
            update: (app, colecao) => new Abas(app)
                .push(new Aba("config", "Configuração", "iconSettings", new FormUpdateCollection(app, colecao), true))
                .push(new Aba("props", "Propriedades", "iconStar", CRUD(app, "Propriedades", { create: "Cria Propriedade" }, {
                    create: FormCreatePropriedade(app, colecao),
                    read: { colecao: colecao._id },
                    update: (app, obj) => new FormUpdatePropriedade(app, obj)
                }, { nome: "string" })))
                .push(new Aba("forms", "Formulários", "iconList", CRUD(app, "Formularios", { create: "Novo Formulário" }, {
                    create: new FormFormulario(app, colecao),
                    read: { colecao: colecao._id },
                    update: (app, obj) => update(app, obj)
                }, { titulo: "string" })))
                .push(new Aba("colecao", "Coleção", "iconFolder", div()).object(async o => {
                    const [formulario] = await app.repository.findOne("Formularios", { colecao: colecao._id })
                    o.componente.children(CRUD(app, colecao.nome, { create: "Novo Documento" }, {
                        create: new FormFactoryCreateForm(app, formulario, colecao, colecao),
                        update: (app, obj) => update(app, obj)
                    }, { nome: "string" }))
                }))
        }, { nome: "string" }), true))
        .push(new Aba("sync", "Sincronização", "iconUploadCloud", div().class("d-grid", "ac-start").object(o => {
            //o.children(...Object.keys(app.wrtcChannels).map(k => nodes(app, k)))
        })))
})