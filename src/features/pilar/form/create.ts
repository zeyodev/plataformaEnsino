import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldIcon from "../../../form/fields/icon";

export default class FormCreatePilar extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Pilar")
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
        await this.app.repository.create("Pilares", data)
        snackbar.show("Pilar criado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
