import App from "../../../app"
import button from "../../../components/atoms/button"
import snackbar from "../../../components/atoms/snackbar"
import Form from "../../../form"
import FieldInput from "../../../form/fields/input"
import FieldSelect from "../../../form/fields/select"
import { iconTrash } from "icons"

export default class FormUpdateCheckoutLink extends Form {
    constructor(private app: App, private obj: any) {
        super()
        this.title.text("Editar Link de Checkout")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button")
                .icon(iconTrash()).click(() =>
                    this.app.repository.delete("CheckoutLinks", obj._id).then(() => {
                        snackbar.show("Checkout link removido", "success")
                        this.triggerSubmit()
                    })
                )
        )

        const selectStatus = new FieldSelect("status", true).label("Status")
        selectStatus.options(
            { value: "ativo", name: "Ativo" },
            { value: "expirado", name: "Expirado" },
            { value: "usado", name: "Usado" },
        )
        if (obj.status) selectStatus.setValue(obj.status)

        const validade = new FieldInput("validade", false).label("Validade").setType("date")
        if (obj.validade) validade.setValue(obj.validade)

        this.body.children(selectStatus, validade)
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields()
        await this.app.repository.update("CheckoutLinks", this.obj._id, data)
        snackbar.show("Checkout link atualizado!", "success")
        this.triggerSubmit(data)
    }
}
