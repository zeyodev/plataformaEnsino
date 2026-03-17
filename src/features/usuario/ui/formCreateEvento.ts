import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormCreateEvento extends Form {
    constructor(private app: App, private usuarioId: string) {
        super();
        this.title.text("Registrar Evento")
        this.body.children(
            new FieldInput("tipo", true).label("Tipo (ex: meet, entrada, conclusão)"),
            new FieldInput("descricao", true).label("Descrição"),
            new FieldInput("data", true).label("Data"),
        )
        this.footer.children(
            button("Registrar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("Eventos", { ...data, usuario: this.usuarioId })
        this.triggerSubmit(data)
    }
}
