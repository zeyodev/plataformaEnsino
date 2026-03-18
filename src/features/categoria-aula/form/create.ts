import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldIcon from "../../../form/fields/icon";

export default class FormCreateCategoriaAula extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Categoria de Aula")
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("value", true).label("Valor (slug)"),
            new FieldIcon("icon", true).label("Ícone"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("CategoriasAulas", data)
        this.triggerSubmit(data)
    }
}
