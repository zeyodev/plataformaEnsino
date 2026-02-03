import App from "../../../app";
import Button from "../../../component1.1/atoms/buttons";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import Nicho from "../../nicho";

export default class FormCreateSecao extends Form {
    constructor(private app: App, private nicho: Nicho) {
        super();
        this.title.text("Criar Ambiente");
        this.body.children(
            new FieldInput("nome", true).label("Nome do Nicho"),
        )
        this.footer.children(
            new Button("Criar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        data.nicho = this.nicho._id;
        await this.app.repository.create("Secoes", data)
        window.history.back();
    }

}