import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateEtapa extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Etapa")
        const selectFase = new FieldSelect("fase", true).label("Fase");
        const selectAula = new FieldSelect("aula", true).label("Aula");
        (async () => {
            const [fases] = await app.repository.findMany("Fases", {})
            selectFase.options(...fases.map((f: any) => ({ value: f._id, name: f.titulo })))
            selectFase.setValue(obj.fase || "")
            const [aulas] = await app.repository.findMany("Aulas", {})
            selectAula.options(...aulas.filter((a: any) => a).map((a: any) => ({ value: a._id, name: a.title || a.titulo || "Sem título" })))
            selectAula.setValue(obj.aula || "")
        })()
        this.body.children(
            selectFase,
            new FieldInput("titulo", true).label("Título").setValue(obj.titulo || ""),
            new FieldInput("motivo", true).label("Motivo").setValue(obj.motivo || ""),
            new FieldInput("ordem", true).label("Ordem").setValue(String(obj.ordem || "")),
            selectAula,
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("Etapas", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.ordem = Number(data.ordem)
        await this.app.repository.update("Etapas", this.obj._id, data)
        this.triggerSubmit(data)
    }
}
