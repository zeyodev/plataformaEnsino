import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormCreateAdaptadorMapeamento extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Mapeamento")
        this.body.children(
            new FieldInput("_id", true).label("ID do Mapeamento"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("AdaptadorMapeamento", data)
        this.triggerSubmit(data)
    }
}
