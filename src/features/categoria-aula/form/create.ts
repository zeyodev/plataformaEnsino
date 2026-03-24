import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldIcon from "../../../form/fields/icon";

export default class FormCreateCategoriaAula extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Categoria de Aula")
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            new FieldIcon("icon", true).label("Ícone").setValue("iconFolder"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.value = data.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
        await this.app.repository.create("CategoriasAulas", data)
        snackbar.show("Categoria criada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
