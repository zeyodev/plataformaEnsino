import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateCollection extends Form {
    collection = "Colecoes"
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Criar Nicho");
        this.body.children(
            new FieldInput("nome", true).label("Nome do Nicho"),
            new FieldSelect("tipo", true).options(
                {value: "document", name: "Documentos"},
                {value: "edge", name: "Ligações"},
            )
        )
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        //data.ambiente = this.obj._id
        console.log(data)
        await this.app.repository.create(this.collection, data)
        window.history.back();
    }
}