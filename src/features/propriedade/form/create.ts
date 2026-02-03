import { div } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";
import CRUD from "../../../components/organisms/CRUD";
import { getExtras, tiposPropriedade } from "./_lib";
import extra from "../../../form/fields/extra";
//FormCreatePropriedade
export default (app: App, obj: any) => (new class extends Form {
    collection = "Propriedades"

    async onSubmit() {
        const data = this.getDataFromFields();
        data.colecao = obj._id
        console.log(data)
        await app.repository.create(this.collection, data)
        window.history.back();
    }
}).object(o => {
    o.title.text("Criar Propriedade");
    const fieldKey = new FieldInput("chave", true).label("Chave Identificadora").setValue(obj.chave)
    o.body.children(
        new FieldInput("nome", true).label("Nome da Propriedade").setValue(obj.nome).on("change", (o) => {
            console.log(o.getValue())
            fieldKey.setValue(o.getValue().toLocaleLowerCase())
        }),
        fieldKey,
        new FieldSelect("tipo", true).options(...tiposPropriedade).on("change", (select) => {
            const extras = getExtras(app, {})
            select.extrafield?.element.remove()
            if (!extras[select.getValue()]) return
            o.body.children(select.extrafield = extras[select.getValue()])
        }),

    ).children(
        extra(o, "tipo", {
            "relation": new FieldSelect("collection", true).object(async o => {
                const [colecoes] = await app.repository.findMany("Colecoes", {})
                colecoes.forEach(c => o.options({ value: c._id, name: c.nome }))
            })
        })
    )
    o.footer.children(
        button("Criar").set("type", "submit")
    )
})