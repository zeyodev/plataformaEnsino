import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldIcon from "../../../form/fields/icon";

export default class FormUpdateProduto extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Produto")
        const fieldTitulo = new FieldInput("titulo", true).label("Título")
        const fieldDescricao = new FieldInput("descricao", true).label("Descrição")
        const fieldIcon = new FieldIcon("icon", true).label("Ícone")

        if (obj.titulo) fieldTitulo.setValue(obj.titulo)
        if (obj.descricao) fieldDescricao.setValue(obj.descricao)
        if (obj.icon) fieldIcon.setValue(obj.icon)

        this.body.children(fieldTitulo, fieldDescricao, fieldIcon)
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Produtos", this.obj._id, data)
        this.triggerSubmit(data)
    }
}
