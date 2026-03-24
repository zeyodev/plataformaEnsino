import iconTrash from "icons/src/business_and_online_icons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateEtapaConnection extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Conexão de Etapa")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("EtapaConnections", obj._id).then(() => {
                this.triggerSubmit()
            }))
        )
        const selectJornada = new FieldSelect("jornada", true).label("Jornada");
        const selectFrom = new FieldSelect("from", true).label("De (Etapa)");
        const selectTo = new FieldSelect("to", true).label("Para (Etapa)");
        (async () => {
            const [jornadas] = await app.repository.findMany("Jornadas", {})
            selectJornada.options(...jornadas.map((j: any) => ({ value: j._id, name: j.titulo })))
            selectJornada.setValue(obj.jornada || "")
            const [etapas] = await app.repository.findMany("Etapas", {})
            const etapaOpts = etapas.map((e: any) => ({ value: e._id, name: e.titulo }))
            selectFrom.options(...etapaOpts)
            selectFrom.setValue(obj.from || "")
            selectTo.options(...etapaOpts)
            selectTo.setValue(obj.to || "")
        })()
        this.body.children(selectJornada, selectFrom, selectTo)
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("EtapaConnections", this.obj._id, data)
        snackbar.show("Conexão atualizada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
