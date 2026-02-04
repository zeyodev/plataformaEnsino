import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form"
import FieldInput from "../../../form/fields/input";
import Organizacao from "../../organizacao";

export default class FormCreateAmbiente extends Form {
    constructor(private app: App, private organizacao: Organizacao) {
        super();
        this.title.text("Criar Ambiente");
        this.body.children(
            new FieldInput("nome", true).label("Nome do Ambiente"),
        )
        this.footer.children(
            button().text("Criar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        data.organizacao = this.organizacao._id;
        await this.app.repository.create("Ambientes", data)
        window.history.back();
    }

}