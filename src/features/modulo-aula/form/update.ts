import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateModuloAula extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Vínculo Módulo-Aula")
        const selectModulo = new FieldSelect("modulo", true).label("Módulo");
        const selectAula = new FieldSelect("aula", true).label("Aula");
        (async () => {
            const [modulos] = await app.repository.findMany("Modulos", {})
            selectModulo.options(...modulos.map((m: any) => ({ value: m._id, name: m.titulo })))
            selectModulo.setValue(obj.modulo || "")
            const [aulas] = await app.repository.findMany("Aulas", {})
            selectAula.options(...aulas.filter((a: any) => a).map((a: any) => ({ value: a._id, name: a.title || "Sem título" })))
            selectAula.setValue(obj.aula || "")
        })()
        this.body.children(selectModulo, selectAula)
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("ModuloAulas", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("ModuloAulas", this.obj._id, data)
        snackbar.show("Vínculo atualizado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
