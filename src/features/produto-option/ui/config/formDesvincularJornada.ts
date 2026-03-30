import App from "../../../../app";
import button from "../../../../components/atoms/button";
import snackbar from "../../../../components/atoms/snackbar";
import Form from "../../../../form";

export default class FormDesvincularJornada extends Form {
    constructor(private app: App, private obj: any) {
        super()
        this.title.text("Desvincular Jornada")
        app.repository.findOne("Jornadas", { _id: obj.jornada }).then(([jornada]) => {
            if (jornada) this.title.text(`Desvincular: ${jornada.titulo || "Sem título"}`)
        })
        this.footer.children(
            button("Desvincular").set("type", "submit").style("primary")
        )
    }

    async onSubmit() {
        await this.app.repository.delete("ProdutoOptionJornadas", this.obj._id)
        snackbar.show("Jornada desvinculada com sucesso!", "success")
        this.triggerSubmit()
    }
}
