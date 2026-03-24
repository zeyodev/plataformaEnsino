import iconTrash from "icons/src/business_and_online_icons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateUsuario extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Usuário")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("Usuarios", obj._id).then(() => {
                this.triggerSubmit()
            }))
        )
        this.body.children(
            new FieldInput("nome", true).label("Nome").setValue(obj.nome || ""),
            new FieldInput("sobrenome", true).label("Sobrenome").setValue(obj.sobrenome || ""),
            new FieldInput("email", true).label("Email").setValue(obj.email || ""),
            new FieldSelect("role", true).label("Papel").options(
                { value: "user", name: "Usuário" },
                { value: "admin", name: "Administrador" },
            ).setValue(obj.role || "user"),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Usuarios", this.obj._id, data)
        snackbar.show("Usuário atualizado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
