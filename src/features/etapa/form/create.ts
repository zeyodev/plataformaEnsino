import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateEtapa extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Etapa")
        const selectFase = new FieldSelect("fase", true).label("Fase");
        const selectAula = new FieldSelect("aula", true).label("Aula");
        (async () => {
            const [fases] = await app.repository.findMany("Fases", {})
            selectFase.options(...fases.map((f: any) => ({ value: f._id, name: f.titulo })))
            const [aulas] = await app.repository.findMany("Aulas", {})
            selectAula.options(...aulas.filter((a: any) => a).map((a: any) => ({ value: a._id, name: a.title || a.titulo || "Sem título" })))
        })()
        this.body.children(
            selectFase,
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("motivo", true).label("Motivo"),
            new FieldInput("ordem", true).label("Ordem"),
            selectAula,
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.ordem = Number(data.ordem)
        await this.app.repository.create("Etapas", data)
        this.triggerSubmit(data)
    }
}
