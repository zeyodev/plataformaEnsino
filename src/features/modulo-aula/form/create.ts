import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateModuloAula extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Vincular Aula ao Módulo")
        const selectModulo = new FieldSelect("modulo", true).label("Módulo");
        const selectAula = new FieldSelect("aula", true).label("Aula");
        (async () => {
            const [modulos] = await app.repository.findMany("Modulos", {})
            selectModulo.options(...modulos.map((m: any) => ({ value: m._id, name: m.titulo })))
            const [aulas] = await app.repository.findMany("Aulas", {})
            selectAula.options(...aulas.filter((a: any) => a).map((a: any) => ({ value: a._id, name: a.title || "Sem título" })))
        })()
        this.body.children(selectModulo, selectAula)
        this.footer.children(
            button("Vincular").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("ModuloAulas", data)
        this.triggerSubmit(data)
    }
}
