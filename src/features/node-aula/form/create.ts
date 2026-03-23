import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateNodeAula extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Vincular Aula ao Nó")
        const selectNode = new FieldSelect("node", true).label("Nó da Jornada");
        const selectAula = new FieldSelect("aula", true).label("Aula");
        (async () => {
            const [nodes] = await app.repository.findMany("JornadaNodes", {})
            selectNode.options(...nodes.map((n: any) => ({ value: n._id, name: n.titulo })))
            const [aulas] = await app.repository.findMany("Aulas", {})
            selectAula.options(...aulas.filter((a: any) => a).map((a: any) => ({ value: a._id, name: a.title || "Sem título" })))
        })()
        this.body.children(selectNode, selectAula)
        this.footer.children(
            button("Vincular").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("NodeAulas", data)
        snackbar.show("Vínculo criado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
