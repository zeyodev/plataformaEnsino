import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormUpdateAdaptadorMapeamento extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Mapeamento")
        this.body.children(
            new FieldInput("_id", false).label("ID").setValue(obj._id || ""),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("AdaptadorMapeamento", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("AdaptadorMapeamento", this.obj._id, data)
        snackbar.show("Mapeamento atualizado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
