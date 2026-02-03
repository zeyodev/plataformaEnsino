import { span } from "zeyo";
import Form from "../../../../form";
import App from "../../../../app";
import button from "../../../../components/atoms/button";
import Modal from "../../../../states/Modal";
import modal from "../../../../components/molecules/modal";
import iconPlus from "icons/src/business_and_online_icons/iconPlus";
import FormSelectPropriedade from "./selectPropriedade";
import FieldCheckboxSpan from "../../../../form/fields/checkbox";

export default class FormVinculaCampo extends Form {
    constructor(private app: App, private key: string, private formulario: any) {
        super();
        this.title.text("Vincular Campo");
        this.body.children(
            button("Novo Campo").icon(iconPlus()).set("type", "button").click(() => {
                app.context.setState(Modal("create", modal(app, new FormSelectPropriedade(app, key, formulario).setSubmitTrigger((args) => {
                    console.log(args)
                    this.setCampos((this.body.childList[1] as any))
                })))).handle();
            }),
            new FieldCheckboxSpan("campos", true).label("Selecione os Campos").object(async (o) => {
                this.setCampos(o)
            }),
            /* new FieldSelect("key", true).label("Propriedade").object(async (o) => {
                const [campos] = await app.repository.findMany("Campos", { colecao: formulario.colecao || formulario.nicho })
                o.options(...campos.map(c => ({ value: c._id, name: c.label })))
            }), */

        )
        this.footer.children(
            button("Atualizar").set("type", "submit")
        )
    }

    async setCampos(field: FieldCheckboxSpan) {
        const [campos] = await this.app.repository.findMany("Campos", { colecao: this.formulario.colecao || this.formulario.nicho })
        field.clear().push(
            ...campos.map((campo) => ({
                value: campo._id, span: span(campo.label || campo.key || "campo").class("d-flex", "jc-between")
            }))
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields()
        console.log(data)
        for (const campo of data.campos) {
            await this.app.repository.create("CamposFormulario", {
                formulario: this.formulario._id,
                campo
            })
        }
        window.history.back();
    }
}