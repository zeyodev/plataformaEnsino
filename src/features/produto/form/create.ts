import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldIcon from "../../../form/fields/icon";

export default class FormCreateProduto extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Produto")
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("descricao", true).label("Descrição"),
            new FieldIcon("icon", true).label("Ícone"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("Produtos", data)
        snackbar.show("Produto criado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
