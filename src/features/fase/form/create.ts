import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateFase extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Fase")
        const selectJornada = new FieldSelect("jornada", true).label("Jornada");
        (async () => {
            const [jornadas] = await app.repository.findMany("Jornadas", {})
            selectJornada.options(...jornadas.map((j: any) => ({ value: j._id, name: j.titulo })))
        })()
        this.body.children(
            selectJornada,
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("descricao", true).label("Descrição"),
            new FieldInput("ordem", true).label("Ordem"),
            new FieldInput("icon", true).label("Ícone"),
            new FieldInput("theme", true).label("Tema (cor)"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.ordem = Number(data.ordem)
        await this.app.repository.create("Fases", data)
        snackbar.show("Fase criada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
