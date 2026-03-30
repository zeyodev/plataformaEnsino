import App from "../../../../app";
import button from "../../../../components/atoms/button";
import snackbar from "../../../../components/atoms/snackbar";
import Form from "../../../../form";

export default class FormDesvincularPilar extends Form {
    constructor(private app: App, private obj: any) {
        super()
        this.title.text("Desvincular Pilar")
        app.repository.findOne("Pilares", { _id: obj.pilar }).then(([pilar]) => {
            if (pilar) this.title.text(`Desvincular: ${pilar.titulo || "Sem título"}`)
        })
        this.footer.children(
            button("Desvincular").set("type", "submit").style("primary")
        )
    }

    async onSubmit() {
        await this.app.repository.delete("ProdutoOptionPilares", this.obj._id)
        snackbar.show("Pilar desvinculado com sucesso!", "success")
        this.triggerSubmit()
    }
}
