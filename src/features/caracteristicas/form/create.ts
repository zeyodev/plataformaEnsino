import App from "../../../app";
import Form from "../../../form"
import FieldInput from "../../../form/fields/input";
/* import Button from "../../../component1.1/atoms/buttons";
import StateModal from "../../../states/modal";
import Modal from "../../../component1.1/molecules/modal"; */
import Nicho from "../../nicho";
import FieldSelect from "../../../form/fields/select";
import FormUpdateCaracteristica from "./update";
import Caracteristicas from "./list";

export default class FormCreateCaracteristica extends Form {
    constructor(private app: App, private nicho: Nicho) {
        super();
        this.title.text("Nova Característica");
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("icon", true).label("Icone"),
            new FieldSelect("tipo", true).label("Tipo").options(...Caracteristicas.list),
        )
        this.footer.children(
            //new Button().text("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        /* data.nicho = this.nicho._id;
        const [result, err] = await this.app.repository.create("Caracteristicas", data);
        if (err) return;

        window.history.back();
        await this.app.sleep(200);
        console.log(result)
        this.app.context.setState(new StateModal("updateFormulario", new Modal(this.app, new FormUpdateCaracteristica(this.app, result, this.nicho))))
        this.app.context.handle(); */
    }
}