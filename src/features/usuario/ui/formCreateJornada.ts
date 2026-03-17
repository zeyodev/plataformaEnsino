import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormCreateJornadaUsuario extends Form {
    constructor(private app: App, private usuarioId: string) {
        super();
        this.title.text("Criar Jornada")
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("descricao", true).label("Descrição"),
            new FieldInput("icon", true).label("Ícone"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("Jornadas", { ...data, usuario: this.usuarioId })
        this.triggerSubmit(data)
    }
}
