import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateComponente extends Form {
    collection = "Componentes"
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Criar Componente");

        this.body.children(
            new FieldInput("nome", true).label("Nome do Componente"),
        )
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.pertence = this.obj._id
        console.log(data)
        await this.app.repository.create(this.collection, data)
        window.history.back();
    }
}