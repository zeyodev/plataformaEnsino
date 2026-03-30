import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormVincularAulaModulo extends Form {
    private selectAula!: FieldSelect

    constructor(private app: App, private moduloId: string) {
        super();
        this.title.text("Vincular Aula")
        this.selectAula = new FieldSelect("aula", true).label("Aula");
        (async () => {
            const [aulas] = await app.repository.findMany("Aulas", {})
            const aulasSemModulo = aulas.filter((a: any) => !a.modulo || a.modulo === moduloId)
            this.selectAula.options(...aulasSemModulo.map((a: any) => ({ value: a._id, name: a.title || "Sem título" })))
        })()
        this.body.children(this.selectAula)
        this.footer.children(
            button("Vincular").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const { aula } = this.getDataFromFields();
        await this.app.repository.update("Aulas", aula._id, { modulo: this.moduloId })
        snackbar.show("Aula vinculada com sucesso!", "success")
        this.triggerSubmit({ aula })
    }
}
