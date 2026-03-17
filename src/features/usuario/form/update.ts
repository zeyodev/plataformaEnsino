import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateUsuario extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Usuário")
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
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("Usuarios", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Usuarios", this.obj._id, data)
        this.triggerSubmit(data)
    }
}
