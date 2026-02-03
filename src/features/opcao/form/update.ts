import iconTrash from "icons/src/business_and_online_icons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateOpcao extends Form {
    collection = "Opcoes"
    constructor(private app: App, private obj: any) {
        super();
        this.title.text(`Atualiza ${obj.nome}`);
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete(this.collection, obj._id).then(() => {
                window.history.back()
            }))
        )
        const fieldKey = new FieldInput("chave", true).label("Chave Identificadora").setValue(obj.chave)
        this.body.children(
            new FieldInput("nome", true).label("Nome da Propriedade").setValue(obj.nome)
        )
        this.footer.children(
            button("Atualizar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(data)
        Object.assign(this.obj, data)
        await this.app.repository.update(this.collection, this.obj._id, data)
        window.history.back();
    }
}