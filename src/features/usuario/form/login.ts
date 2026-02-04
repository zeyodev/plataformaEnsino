import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import Usuario from "../../../states/usuario";

export default class FormLogin extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Entrar")

        this.body.children(
            new FieldInput("email", true).label("Email"),
            new FieldInput("senha", true).label("Senha").setType("password")
        )

        this.footer.children(
            button("Entrar").style("primary")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(data);
        const tokens = await this.app.autentica(data)
        this.app.context.action("login", tokens)
    }
}