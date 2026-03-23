import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldIcon from "../../../form/fields/icon";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateProdutoOption extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Option")
        const fieldNome = new FieldInput("nome", true).label("Nome")
        const fieldIcon = new FieldIcon("icon", true).label("Ícone")
        const fieldTipo = new FieldSelect("tipo", true).label("Tipo").options(
            { value: "pilares", name: "Pilares" },
            { value: "jornadas", name: "Jornadas" },
            { value: "encontros", name: "Encontros" },
        )
        const fieldOrdem = new FieldInput("ordem", true).label("Ordem")

        if (obj.nome) fieldNome.setValue(obj.nome)
        if (obj.icon) fieldIcon.setValue(obj.icon)
        if (obj.tipo) fieldTipo.setValue(obj.tipo)
        if (obj.ordem !== undefined) fieldOrdem.setValue(String(obj.ordem))

        this.body.children(fieldNome, fieldIcon, fieldTipo, fieldOrdem)
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.ordem = Number(data.ordem) || 0
        await this.app.repository.update("ProdutoOptions", this.obj._id, data)
        this.triggerSubmit(data)
    }
}
