import iconTrash from "icons/src/business_and_online_icons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateJornada extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Jornada")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("Jornadas", obj._id).then(() => {
                this.triggerSubmit()
            }))
        )
        const selectProduto = new FieldSelect("produto", true).label("Produto");
        (async () => {
            const [produtos] = await app.repository.findMany("Produtos", {})
            selectProduto.options(
                { value: "", name: "-- Nenhum --" },
                ...produtos.map((p: any) => ({ value: p._id, name: p.titulo }))
            )
            if (obj.produto) selectProduto.setValue(obj.produto)
        })()
        this.body.children(
            new FieldInput("titulo", true).label("Título").setValue(obj.titulo || ""),
            new FieldInput("descricao", true).label("Descrição").setValue(obj.descricao || ""),
            new FieldInput("icon", true).label("Ícone").setValue(obj.icon || ""),
            selectProduto,
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Jornadas", this.obj._id, data)
        snackbar.show("Jornada atualizada com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
