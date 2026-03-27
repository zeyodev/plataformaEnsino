import iconTrash from "lucideIcons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateEncontro extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Encontro")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("Encontros", obj._id).then(() => {
                this.triggerSubmit()
            }))
        )

        const selectStatus = new FieldSelect("status", true).label("Status")
        selectStatus.options(
            { value: "agendado", name: "Agendado" },
            { value: "em_andamento", name: "Em andamento" },
            { value: "encerrado", name: "Encerrado" },
        )

        this.body.children(
            new FieldInput("titulo", true).label("Título").setValue(obj.titulo || ""),
            new FieldInput("descricao", false).label("Descrição").setValue(obj.descricao || ""),
            new FieldInput("data", true).label("Data").setValue(obj.data || ""),
            new FieldInput("meet_link", false).label("Link do Google Meet").setValue(obj.meet_link || ""),
            selectStatus,
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Encontros", this.obj._id, data)
        snackbar.show("Encontro atualizado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
