import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateJornadaNode extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Nó da Jornada")
        const selectJornada = new FieldSelect("jornada", true).label("Jornada");
        (async () => {
            const [jornadas] = await app.repository.findMany("Jornadas", {})
            selectJornada.options(...jornadas.map((j: any) => ({ value: j._id, name: j.titulo })))
        })()
        this.body.children(
            selectJornada,
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("descricao", true).label("Descrição"),
            new FieldInput("tier", true).label("Tier (nível)"),
            new FieldInput("icon", true).label("Ícone"),
            new FieldInput("theme", true).label("Tema (cor)"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.tier = Number(data.tier)
        await this.app.repository.create("JornadaNodes", data)
        this.triggerSubmit(data)
    }
}
