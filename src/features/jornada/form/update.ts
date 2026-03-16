import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormUpdateJornada extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Jornada")
        this.body.children(
            new FieldInput("titulo", true).label("Título").setValue(obj.titulo || ""),
            new FieldInput("descricao", true).label("Descrição").setValue(obj.descricao || ""),
            new FieldInput("icon", true).label("Ícone").setValue(obj.icon || ""),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("Jornadas", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Jornadas", this.obj._id, data)
        this.triggerSubmit(data)
    }
}
