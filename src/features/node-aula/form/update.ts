import iconTrash from "lucideIcons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateNodeAula extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Vínculo Nó-Aula")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("NodeAulas", obj._id).then(() => {
                this.triggerSubmit()
            }))
        )
        const selectNode = new FieldSelect("node", true).label("Nó da Jornada");
        const selectAula = new FieldSelect("aula", true).label("Aula");
        (async () => {
            const [nodes] = await app.repository.findMany("JornadaNodes", {})
            selectNode.options(...nodes.map((n: any) => ({ value: n._id, name: n.titulo })))
            selectNode.setValue(obj.node || "")
            const [aulas] = await app.repository.findMany("Aulas", {})
            selectAula.options(...aulas.filter((a: any) => a).map((a: any) => ({ value: a._id, name: a.title || "Sem título" })))
            selectAula.setValue(obj.aula || "")
        })()
        this.body.children(selectNode, selectAula)
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("NodeAulas", this.obj._id, data)
        snackbar.show("Vínculo atualizado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
