import iconTrash from "icons/src/business_and_online_icons/iconTrash";
import App from "../../../../app";
import button from "../../../../components/atoms/button";
//import Button from "../../../../component1.1/atoms/buttons";

import FieldSelect from "../../../../form/fields/select";
import Nicho from "../../../nicho";
import FactoryFormulario from "../factory";

export default class FormFactoryUpdateForm extends FactoryFormulario {
    constructor(app: App, formulario: any, private model: { [key: string]: any }, private colecao: any) {
        console.log(formulario, model)
        super(app, formulario);

        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() =>
                this.app.repository.delete(this.colecao.nome, model._id).then(() => {
                    window.history.back()
                })
            )
        )
        this.footer.children(
            button("Atualizar").set("type", "submit")
        )

        this.waitDone(() => {
            const fields = this.getFieldsInObject();
            for (const key in fields) {
                console.log(key, this.model[key])
                fields[key].setValue(this.model[key]);
            }
        })
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(data);
        const [, err] = await this.app.repository.update(this.colecao.nome, this.model._id, data);
        if (err) return;
        window.history.back();
        if (this.submitTrigger)
            this.submitTrigger(data)
        window.history.back();
        /* 
        await this.app.sleep(200);
        console.log(result)
        this.app.context.setState(new StateModal("updateFormulario", new Modal(this.app, new FormUpdateFormulario(this.app, result, this.Interface))))
        this.app.context.handle(); */
    }
}