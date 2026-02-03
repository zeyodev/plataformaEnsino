import Z from "zeyo";
import Form from "../../../../form";
import App from "../../../../app";
//import Button from "../../../../component1.1/atoms/buttons";
import FieldSelect from "../../../../form/fields/select";
import button from "../../../../components/atoms/button";
import iconTrash from "icons/src/business_and_online_icons/iconTrash";

export default class FormUpdateVinculoCampo extends Form {
    collection = "CamposFormulario"
    constructor(private app: App, private vinculo: any) {
        super();
        this.title.text("Vinculo do Campo");
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete(this.collection, vinculo._id).then(() => {
                window.history.back()
            }))
        )
        this.body.children(
            new FieldSelect("campo", true).object(async o => {
                const [formulario] = await this.app.repository.findOne("Formularios", { _id: vinculo.formulario })
                const [campos] = await this.app.repository.findMany("Campos", { colecao: formulario.colecao })
                o.options(
                    ...campos.map((campo) => ({
                        value: campo._id, name: campo.label || campo.key
                    }))
                ).setValue(vinculo.campo)
            }),
        )
        this.footer.children(
            //button("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("CamposFormulario", this.vinculo._id, data)
        window.history.back();
    }
}