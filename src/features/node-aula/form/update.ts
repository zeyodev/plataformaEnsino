import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateNodeAula extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Vínculo Nó-Aula")
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
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("NodeAulas", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("NodeAulas", this.obj._id, data)
        this.triggerSubmit(data)
    }
}
