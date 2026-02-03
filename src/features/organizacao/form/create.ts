import App from "../../../app";
import Button from "../../../component1.1/atoms/buttons";
import Form from "../../../form"
import FieldInput from "../../../form/fields/input";

export default class FormCreateOrganizacao extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Organização");
        this.body.children(
            new FieldInput("nome", true).label("Nome da Organização"),
        )
        this.footer.children(
            new Button().text("Criar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(data)
        const [org, err] = await this.app.repository.create("Organizacoes", data);
        if(err) return console.error(err);
        const evento = "uc/criarorganizacao"
        this.app.socket.emit(evento, org);
        const result = await this.app.socket.wait(evento);
        console.log(result);
        window.history.back();
    }

}