import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateAssinatura extends Form {
    constructor(private app: App, private usuarioId: string) {
        super();
        this.title.text("Adicionar Assinatura")
        const selectProduto = new FieldSelect("produto", true).label("Produto");
        (async () => {
            const [produtos] = await app.repository.findMany("Produtos", {})
            selectProduto.options(
                ...produtos.map((p: any) => ({ value: p._id, name: p.titulo }))
            )
        })()
        this.body.children(selectProduto)
        this.footer.children(
            button("Adicionar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.usuario = this.usuarioId
        await this.app.repository.create("Assinaturas", data)
        this.triggerSubmit(data)
    }
}
