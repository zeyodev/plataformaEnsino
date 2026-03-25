import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
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
        const selectStatus = new FieldSelect("status", true).label("Status")
        selectStatus.options(
            { value: "ativa", name: "Ativa" },
            { value: "inativa", name: "Inativa" },
            { value: "suspensa", name: "Suspensa" },
        )
        const dataInicio = new FieldInput("dataInicio", true).label("Data Início").setType("date")
        const dataFim = new FieldInput("dataFim", false).label("Data Fim (opcional)").setType("date")
        this.body.children(selectProduto, selectStatus, dataInicio, dataFim)
        this.footer.children(
            button("Adicionar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.usuario = this.usuarioId
        await this.app.repository.create("Assinaturas", data)
        snackbar.show("Assinatura adicionada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
