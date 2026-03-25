import App from "../../../app"
import button from "../../../components/atoms/button"
import snackbar from "../../../components/atoms/snackbar"
import Form from "../../../form"
import FieldInput from "../../../form/fields/input"
import FieldSelect from "../../../form/fields/select"

export default class FormCreateCupom extends Form {
    constructor(private app: App) {
        super()
        this.title.text("Criar Cupom")

        const codigo = new FieldInput("codigo", true).label("Código")
        const descontoPercentual = new FieldInput("desconto_percentual", false).label("Desconto % (opcional)").setType("number")
        const descontoValor = new FieldInput("desconto_valor", false).label("Desconto R$ (opcional)").setType("number")
        const validade = new FieldInput("validade", true).label("Validade").setType("date")
        const usosMaximos = new FieldInput("usos_maximos", true).label("Usos Máximos").setType("number")

        const selectStatus = new FieldSelect("status", true).label("Status")
        selectStatus.options(
            { value: "ativo", name: "Ativo" },
            { value: "expirado", name: "Expirado" },
        )

        this.body.children(codigo, descontoPercentual, descontoValor, validade, usosMaximos, selectStatus)
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields()
        data.usos_atuais = 0
        if (data.desconto_percentual) data.desconto_percentual = parseFloat(data.desconto_percentual)
        if (data.desconto_valor) data.desconto_valor = parseFloat(data.desconto_valor)
        data.usos_maximos = parseInt(data.usos_maximos) || 1
        await this.app.repository.create("Cupons", data)
        snackbar.show("Cupom criado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
