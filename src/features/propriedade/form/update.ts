import iconTrash from "icons/src/business_and_online_icons/iconTrash";
import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";
import Field from "../../../form/fields/field";
import { getExtras, tiposPropriedade } from "./_lib";

export default class FormUpdatePropriedade extends Form {
    collection = "Propriedades"
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Criar Propriedade");
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete(this.collection, obj._id).then(() => {
                window.history.back()
            }))
        )
        const fieldKey = new FieldInput("chave", true).label("Chave Identificadora").setValue(obj.chave)
        this.body.children(
            new FieldInput("nome", true).label("Nome da Propriedade").setValue(obj.nome).on("change", (o) => {
                console.log(o.getValue())
                fieldKey.setValue(o.getValue().toLocaleLowerCase())
            }),
            fieldKey,
            new FieldSelect("tipo", true).options(...tiposPropriedade).setValue(obj.tipo).object(select => {
                const extras = getExtras(app, obj)
                if (extras[obj.tipo])
                    setTimeout(() => {
                        this.body.children(select.extrafield = extras[obj.tipo])
                    }, 300);

                select.on("change", (o) => {
                    o.extrafield?.element.remove()
                    if (!extras[o.getValue()]) return
                    this.body.children(o.extrafield = extras[o.getValue()])
                })
            }),
        )
        this.footer.children(
            button("Atualizar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(this.body.childList)
        console.log(data)
        Object.assign(this.obj, data)
        await this.app.repository.update(this.collection, this.obj._id, data)
        window.history.back();
    }
}