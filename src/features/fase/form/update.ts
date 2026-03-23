import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateFase extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Fase")
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
            new FieldInput("ordem", true).label("Ordem").setValue(String(obj.ordem || "")),
            new FieldInput("icon", true).label("Ícone").setValue(obj.icon || ""),
            new FieldInput("theme", true).label("Tema (cor)").setValue(obj.theme || ""),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("Fases", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.ordem = Number(data.ordem)
        await this.app.repository.update("Fases", this.obj._id, data)
        snackbar.show("Fase atualizada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
