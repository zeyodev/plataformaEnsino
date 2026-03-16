import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateEtapaConnection extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Conexão de Etapa")
        const selectJornada = new FieldSelect("jornada", true).label("Jornada");
        const selectFrom = new FieldSelect("from", true).label("De (Etapa)");
        const selectTo = new FieldSelect("to", true).label("Para (Etapa)");
        (async () => {
            const [jornadas] = await app.repository.findMany("Jornadas", {})
            selectJornada.options(...jornadas.map((j: any) => ({ value: j._id, name: j.titulo })))
            const [etapas] = await app.repository.findMany("Etapas", {})
            const etapaOpts = etapas.map((e: any) => ({ value: e._id, name: e.titulo }))
            selectFrom.options(...etapaOpts)
            selectTo.options(...etapaOpts)
        })()
        this.body.children(selectJornada, selectFrom, selectTo)
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("EtapaConnections", data)
        this.triggerSubmit(data)
    }
}
