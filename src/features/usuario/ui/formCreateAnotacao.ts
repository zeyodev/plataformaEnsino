import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormCreateAnotacao extends Form {
    constructor(private app: App, private usuarioId: string) {
        super();
        this.title.text("Nova Anotação")
        this.body.children(
            new FieldInput("texto", true).label("Anotação"),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("Anotacoes", { ...data, usuario: this.usuarioId, data: new Date().toISOString() })
        this.triggerSubmit(data)
    }
}
