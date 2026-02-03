import { div } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";
//import Button from "../../../component1.1/atoms/buttons";
import Form from "../../../form"
import extra from "../../../form/fields/extra";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateNicho extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Criar Opção");
        this.body.children(
            new FieldInput("nome", true).label("Nome"),
            new FieldInput("icon", true).label("Icone"),
            //new FieldInput("path", true).label("Caminho"),
            new FieldSelect("colecao", true).object(async o => {
                const [colecoes] = await app.repository.findMany("Colecoes", {})
                colecoes.forEach(c => o.options({ value: c._id, name: c.nome }))
            }),
        )
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        //data.ambiente = this.ambiente._id
        Object.assign(data, this.obj)
        await this.app.repository.create("Opcoes", data)
        window.history.back();
    }
}