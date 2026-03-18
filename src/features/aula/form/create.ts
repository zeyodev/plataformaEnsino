import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormCreateAula extends Form {
    constructor(private app: App, private categoria?: string) {
        super();
        this.title.text("Criar Aula")
        this.body.children(
            new FieldInput("title", true).label("Título"),
            new FieldInput("description", true).label("Descrição"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.status = "CONVERTED"
        data.playable = true
        if (this.categoria) data.categoria = this.categoria
        await this.app.repository.create("Aulas", data)
        this.triggerSubmit(data)
    }
}
