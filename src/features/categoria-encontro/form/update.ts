import iconTrash from "lucideIcons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormUpdateCategoriaEncontro extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Categoria de Encontro")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("CategoriasEncontros", obj._id).then(() => {
                this.triggerSubmit()
            }))
        )
        this.body.children(
            new FieldInput("titulo", true).label("Título").setValue(obj.titulo || ""),
            new FieldInput("value", true).label("Valor (slug)").setValue(obj.value || ""),
            new FieldInput("icon", true).label("Ícone").setValue(obj.icon || ""),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("CategoriasEncontros", this.obj._id, data)
        snackbar.show("Categoria atualizada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
