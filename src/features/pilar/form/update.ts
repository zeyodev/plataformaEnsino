import iconTrash from "icons/src/business_and_online_icons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldIcon from "../../../form/fields/icon";

export default class FormUpdatePilar extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Pilar")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("Pilares", obj._id).then(() => {
                this.triggerSubmit()
            }))
        )
        this.body.children(
            new FieldInput("titulo", true).label("Título").setValue(obj.titulo || ""),
            new FieldInput("value", true).label("Valor (slug)").setValue(obj.value || ""),
            new FieldIcon("icon", true).label("Ícone").setValue(obj.icon || ""),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Pilares", this.obj._id, data)
        snackbar.show("Pilar atualizado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
