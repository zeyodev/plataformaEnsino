import App from "../../../app";
//import Button from "../../../component1.1/atoms/buttons";
import Form from "../../../form"
import FieldInput from "../../../form/fields/input";
/* import StateModal from "../../../states/modal";
import Modal from "../../../component1.1/molecules/modal"; */
import FormUpdateFormulario from "./update";
import Nicho from "../../nicho";
import FieldSelect from "../../../form/fields/select";
import button from "../../../components/atoms/button";
import Modal from "../../../states/Modal";
import modal from "../../../components/molecules/modal";

export default class FormFormulario extends Form {
    constructor(private app: App, private nicho: Nicho) {
        super();
        this.title.text("Novo Formulario");
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            new FieldSelect("tipo", true).label("Tipo").options(
                {value: "create", name:"Criar"}, 
                {value: "update", name:"Atualizar"}
            ),
        )
        this.footer.children(
            button("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        data.colecao = this.nicho._id;
        const [result, err] = await this.app.repository.create("Formularios", data);
        if (err) return;

        window.history.back();
        await this.app.sleep(200);
        console.log(result)
        //this.app.context.setState(Modal("updateFormulario", modal(this.app, new FormUpdateFormulario(this.app, result)))).handle();
    }
}