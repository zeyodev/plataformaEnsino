import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateJornada extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Jornada")
        const selectProduto = new FieldSelect("produto", true).label("Produto");
        (async () => {
            const [produtos] = await app.repository.findMany("Produtos", {})
            selectProduto.options(
                { value: "", name: "-- Nenhum --" },
                ...produtos.map((p: any) => ({ value: p._id, name: p.titulo }))
            )
        })()
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("descricao", true).label("Descrição"),
            new FieldInput("icon", true).label("Ícone"),
            selectProduto,
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("Jornadas", data)
        snackbar.show("Jornada criada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
