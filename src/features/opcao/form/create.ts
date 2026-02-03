import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateOpcao extends Form {
    collection = "Opcoes"
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Criar Opção");
        this.body.children(
            new FieldInput("nome", true).label("Nome da Opção"),
            new FieldInput("valor", true).label("Valor"),
        )
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.propriedade = this.obj._id
        console.log(data)
        await this.app.repository.create(this.collection, data)
        window.history.back();
    }
}