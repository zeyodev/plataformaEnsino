import iconTrash from "lucideIcons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormUpdateAula extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Aula")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("Aulas", obj._id).then(() => {
                this.triggerSubmit()
            }))
        )
        this.body.children(
            new FieldInput("title", true).label("Título").setValue(obj.title || ""),
            new FieldInput("description", true).label("Descrição").setValue(obj.description || ""),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Aulas", this.obj._id, data)
        snackbar.show("Aula atualizada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
