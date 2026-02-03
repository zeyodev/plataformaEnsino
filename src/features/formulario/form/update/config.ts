import Z from "zeyo";
import App from "../../../../app";
import Form from "../../../../form"
import FieldInput from "../../../../form/fields/input";
import FieldSubForm from "../../../../form/fields/subForm";
/* import Button from "../../../component1.1/atoms/buttons";
import StateModal from "../../../states/modal";
import Modal from "../../../component1.1/molecules/modal";
import CardTitleDescription from "../../../component1.1/molecules/cardTitleDescription"; */
import FormCreateCampo from "../../campo/form/create";
import FormUpdateCampo from "../../campo/form/update";
import FactoryFormulario from "../factory";
import FieldSelect from "../../../../form/fields/select";

export default class FormUpdateFormulario extends Form {
    constructor(private app: App, private formulario: any) {
        super();
        this.title.text(formulario.titulo);
        this.body.children(
            new FieldInput("titulo", true).label("Título").setValue(formulario.titulo),
            new FieldSelect("tipo", true).label("Tipo").options(
                {value: "create", name:"Criar"}, 
                {value: "update", name:"Atualizar"}
            ).setValue(formulario.tipo),
            /* new Button("Preview").set("type", "button").click(() => {
                this.app.context.setState(new StateModal(`preview`, new Modal(this.app, new FactoryFormulario(this.app, formulario))))
                this.app.context.handle()
            }) */
        )
        this.footer.children(
            //new Button().text("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        //await this.app.repository.update("Formularios", this.formulario._id, data);
        window.history.back();
    }
}