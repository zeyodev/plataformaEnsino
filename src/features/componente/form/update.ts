import iconTrash from "lucideIcons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateComponente extends Form {
    collection = "Componentes"
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Atualizar Componente");
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete(this.collection, obj._id).then(() => {
                window.history.back()
            }))
        )
        this.body.children(
            new FieldInput("nome", true).label("Nome da Opção").setValue(obj.nome),
            new FieldSelect("colecao", true).label("Selecione a Coleção").object(async o => {
                const [colecoes] = await app.repository.findMany("Colecoes", {})
                for (const c of colecoes)
                    o.options({ value: c._id, name: c.nome })
                o.setValue(obj.colecao)
            }),
        )
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update(this.collection, this.obj._id, data)
        snackbar.show("Componente atualizado com sucesso!", "success")
        window.history.back();
    }
}