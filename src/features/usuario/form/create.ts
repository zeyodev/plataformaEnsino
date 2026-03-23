import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormCreateUsuario extends Form {
    constructor(_app: App) {
        super();
        this.title.text("Criando Conta")
        this.body.children(
            new FieldInput("nome", false).label("Nome"),
            new FieldInput("email", true).label("Email"),
            new FieldInput("senha", true).label("Senha").setType("password"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await fetch(`${window.location.origin}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        snackbar.show("Conta criada com sucesso!", "success")
    }
}