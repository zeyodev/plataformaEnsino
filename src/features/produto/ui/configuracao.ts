import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import FormUpdateProduto from "../form/update";
import FormCreateProdutoOption from "../../produto-option/form/create";
import configuracaoProdutoOption from "../../produto-option/ui/configuracao";
import produtoOptionComponent from "../../produto-option/ui/crudComponent";
import FormCreateMembro from "../../membro/form/create";
import membroComponent from "../../membro/ui/crudComponent";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("editar", "Editar Produto", "iconSettings", new FormUpdateProduto(app, obj), true))
        .push(new Aba("options", "Options do Produto", "iconLayers",
            CRUD(app, "ProdutoOptions", { create: "Criar Option" }, {
                create: new FormCreateProdutoOption(app, obj._id),
                read: { produto: obj._id },
                update: (app, o) => configuracaoProdutoOption(app, o)
            }, produtoOptionComponent)
        ))
        .push(new Aba("membros", "Membros", "iconUsers",
            CRUD(app, "Assinaturas", { create: "Adicionar Membro" }, {
                create: new FormCreateMembro(app, obj._id),
                read: { produto: obj._id },
                update: (app, m) => new FormCreateMembro(app, obj._id)
            }, membroComponent)
        ))
