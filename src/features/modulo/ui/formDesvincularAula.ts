import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";

export default class FormDesvincularAula extends Form {
    constructor(private app: App, private obj: any) {
        super()
        this.title.text("Desvincular Aula")
        app.repository.findOne("Aulas", { _id: obj.aula }).then(([aula]) => {
            if (aula) this.title.text(`Desvincular: ${aula.title || "Sem título"}`)
        })
        this.footer.children(
            button("Desvincular").set("type", "submit").style("primary")
        )
    }

    async onSubmit() {
        await this.app.repository.delete("ModuloAulas", this.obj._id)
        snackbar.show("Aula desvinculada com sucesso!", "success")
        this.triggerSubmit()
    }
}
