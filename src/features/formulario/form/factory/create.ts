import App from "../../../../app";
import button from "../../../../components/atoms/button";
import FactoryFormulario from "../factory";

export default class FormFactoryCreateForm extends FactoryFormulario {
    constructor( app: App, formulario: any, private parent: {_id: string}, private colecao: any) {
        super(app, formulario);
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        if(this.relacionamento && this.relacionamento.key)
            data[this.relacionamento.key] = this.parent._id;
        const [result, err] = await this.app.repository.create(this.colecao.nome, data);
        if(this.submitTrigger){
            this.submitTrigger(result, err);
        }
        window.history.back();
        /* 
        await this.app.sleep(200);
        console.log(result)
        this.app.context.setState(new StateModal("updateFormulario", new Modal(this.app, new FormUpdateFormulario(this.app, result, this.Interface))))
        this.app.context.handle(); */
    }
}