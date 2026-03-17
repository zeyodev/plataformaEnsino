import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormCreateModuloPilar extends Form {
    constructor(private app: App, private pilarId: string) {
        super();
        this.title.text("Criar Módulo")
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("Modulos", { ...data, pilar: this.pilarId })
        this.triggerSubmit(data)
    }
}
