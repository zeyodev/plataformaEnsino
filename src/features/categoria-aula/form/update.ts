import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldIcon from "../../../form/fields/icon";

export default class FormUpdateCategoriaAula extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Categoria de Aula")
        this.body.children(
            new FieldInput("titulo", true).label("Título").setValue(obj.titulo || ""),
            new FieldInput("value", true).label("Valor (slug)").setValue(obj.value || ""),
            new FieldIcon("icon", true).label("Ícone").setValue(obj.icon || ""),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("CategoriasAulas", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("CategoriasAulas", this.obj._id, data)
        snackbar.show("Categoria atualizada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
