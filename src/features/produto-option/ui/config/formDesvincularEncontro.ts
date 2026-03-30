import App from "../../../../app";
import button from "../../../../components/atoms/button";
import snackbar from "../../../../components/atoms/snackbar";
import Form from "../../../../form";

export default class FormDesvincularEncontro extends Form {
    constructor(private app: App, private obj: any) {
        super()
        this.title.text("Desvincular Categoria de Encontro")
        app.repository.findOne("CategoriasEncontros", { _id: obj.categoriaEncontro }).then(([categoria]) => {
            if (categoria) this.title.text(`Desvincular: ${categoria.titulo || "Sem título"}`)
        })
        this.footer.children(
            button("Desvincular").set("type", "submit").style("primary")
        )
    }

    async onSubmit() {
        await this.app.repository.delete("ProdutoOptionEncontros", this.obj._id)
        snackbar.show("Categoria desvinculada com sucesso!", "success")
        this.triggerSubmit()
    }
}
