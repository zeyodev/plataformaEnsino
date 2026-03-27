import iconTrash from "lucideIcons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateJornadaNode extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Nó da Jornada")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("JornadaNodes", obj._id).then(() => {
                this.triggerSubmit()
            }))
        )
        const selectJornada = new FieldSelect("jornada", true).label("Jornada");
        (async () => {
            const [jornadas] = await app.repository.findMany("Jornadas", {})
            selectJornada.options(...jornadas.map((j: any) => ({ value: j._id, name: j.titulo })))
            selectJornada.setValue(obj.jornada || "")
        })()
        this.body.children(
            selectJornada,
            new FieldInput("titulo", true).label("Título").setValue(obj.titulo || ""),
            new FieldInput("descricao", true).label("Descrição").setValue(obj.descricao || ""),
            new FieldInput("tier", true).label("Tier (nível)").setValue(String(obj.tier || "")),
            new FieldInput("icon", true).label("Ícone").setValue(obj.icon || ""),
            new FieldInput("theme", true).label("Tema (cor)").setValue(obj.theme || ""),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.tier = Number(data.tier)
        await this.app.repository.update("JornadaNodes", this.obj._id, data)
        snackbar.show("Nó atualizado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
