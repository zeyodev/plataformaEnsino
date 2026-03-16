import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormCreateCategoriaEncontro extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Categoria de Encontro")
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("value", true).label("Valor (slug)"),
            new FieldInput("icon", true).label("Ícone"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("CategoriasEncontros", data)
        this.triggerSubmit(data)
    }
}
