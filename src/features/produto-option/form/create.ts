import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldIcon from "../../../form/fields/icon";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateProdutoOption extends Form {
    constructor(private app: App, private produtoId: string) {
        super();
        this.title.text("Criar Option")
        this.body.children(
            new FieldInput("nome", true).label("Nome"),
            new FieldIcon("icon", true).label("Ícone"),
            new FieldSelect("tipo", true).label("Tipo").options(
                { value: "pilares", name: "Pilares" },
                { value: "jornadas", name: "Jornadas" },
                { value: "encontros", name: "Encontros" },
            ),
            new FieldInput("ordem", true).label("Ordem"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.produto = this.produtoId
        data.ordem = Number(data.ordem) || 0
        data.config = {}
        await this.app.repository.create("ProdutoOptions", data)
        this.triggerSubmit(data)
    }
}
