import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateModulo extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Módulo")
        const selectPilar = new FieldSelect("pilar", true).label("Pilar");
        (async () => {
            const [pilares] = await app.repository.findMany("Pilares", {})
            selectPilar.options(
                { value: "", name: "-- Nenhum --" },
                ...pilares.map((p: any) => ({ value: p._id, name: p.titulo }))
            )
            selectPilar.setValue(obj.pilar || "")
        })()
        this.body.children(
            new FieldInput("titulo", true).label("Título").setValue(obj.titulo || ""),
            selectPilar,
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("Modulos", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Modulos", this.obj._id, data)
        snackbar.show("Módulo atualizado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
