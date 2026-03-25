import App from "../../../app"
import button from "../../../components/atoms/button"
import snackbar from "../../../components/atoms/snackbar"
import Form from "../../../form"
import FieldInput from "../../../form/fields/input"
import FieldSelect from "../../../form/fields/select"
import { iconTrash } from "icons"

export default class FormUpdateCupom extends Form {
    constructor(private app: App, private obj: any) {
        super()
        this.title.text("Editar Cupom")
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button")
                .icon(iconTrash()).click(() =>
                    this.app.repository.delete("Cupons", obj._id).then(() => {
                        snackbar.show("Cupom removido", "success")
                        this.triggerSubmit()
                    })
                )
        )

        const codigo = new FieldInput("codigo", true).label("Código")
        if (obj.codigo) codigo.setValue(obj.codigo)

        const descontoPercentual = new FieldInput("desconto_percentual", false).label("Desconto %").setType("number")
        if (obj.desconto_percentual) descontoPercentual.setValue(String(obj.desconto_percentual))

        const descontoValor = new FieldInput("desconto_valor", false).label("Desconto R$").setType("number")
        if (obj.desconto_valor) descontoValor.setValue(String(obj.desconto_valor))

        const validade = new FieldInput("validade", true).label("Validade").setType("date")
        if (obj.validade) validade.setValue(obj.validade)

        const usosMaximos = new FieldInput("usos_maximos", true).label("Usos Máximos").setType("number")
        if (obj.usos_maximos) usosMaximos.setValue(String(obj.usos_maximos))

        const selectStatus = new FieldSelect("status", true).label("Status")
        selectStatus.options(
            { value: "ativo", name: "Ativo" },
            { value: "expirado", name: "Expirado" },
        )
        if (obj.status) selectStatus.setValue(obj.status)

        this.body.children(codigo, descontoPercentual, descontoValor, validade, usosMaximos, selectStatus)
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields()
        if (data.desconto_percentual) data.desconto_percentual = parseFloat(data.desconto_percentual)
        if (data.desconto_valor) data.desconto_valor = parseFloat(data.desconto_valor)
        data.usos_maximos = parseInt(data.usos_maximos) || 1
        await this.app.repository.update("Cupons", this.obj._id, data)
        snackbar.show("Cupom atualizado!", "success")
        this.triggerSubmit(data)
    }
}
