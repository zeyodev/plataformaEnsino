import App from "../../../app"
import button from "../../../components/atoms/button"
import snackbar from "../../../components/atoms/snackbar"
import Form from "../../../form"
import FieldInput from "../../../form/fields/input"
import FieldSelect from "../../../form/fields/select"
import { div, span, h3 } from "zeyo"

export default class FormCreateCheckoutLink extends Form {
    private splitContainer = div().class("d-grid", "gap-m")
    private splits: { metodo: FieldSelect, valor: FieldInput, parcelas: FieldInput, el: any }[] = []

    constructor(private app: App) {
        super()
        this.title.text("Criar Link de Checkout")

        const selectProduto = new FieldSelect("produto", true).label("Produto")
        ;(async () => {
            const [produtos] = await app.repository.findMany("Produtos", {})
            selectProduto.options(
                ...produtos.map((p: any) => ({ value: p._id, name: p.titulo }))
            )
        })()

        const valorTotal = new FieldInput("valor_total", true).label("Valor Total (R$)").setType("number")
        const validade = new FieldInput("validade", false).label("Validade (opcional)").setType("date")

        const selectCupom = new FieldSelect("cupom", false).label("Cupom (opcional)")
        selectCupom.options({ value: "", name: "Nenhum" })
        ;(async () => {
            const [cupons] = await app.repository.findMany("Cupons", { status: "ativo" })
            selectCupom.options(
                { value: "", name: "Nenhum" },
                ...cupons.map((c: any) => ({ value: c._id, name: c.codigo }))
            )
        })()

        const btnAddSplit = button("+ Adicionar Pagamento").set("type", "button").style("secondary")
        btnAddSplit.click(() => this.addSplit())

        this.body.children(
            selectProduto,
            valorTotal,
            h3("Métodos de Pagamento"),
            this.splitContainer,
            btnAddSplit,
            selectCupom,
            validade,
        )
        this.footer.children(
            button("Gerar Link").set("type", "submit").style("primary"),
        )

        // Adiciona primeiro split por padrão
        this.addSplit()
    }

    private addSplit() {
        const metodo = new FieldSelect(`split_metodo_${this.splits.length}`, false).label("Método")
        metodo.options(
            { value: "pix", name: "PIX" },
            { value: "boleto", name: "Boleto" },
            { value: "cartao", name: "Cartão de Crédito" },
        )
        const valor = new FieldInput(`split_valor_${this.splits.length}`, false).label("Valor (R$)").setType("number")
        const parcelas = new FieldInput(`split_parcelas_${this.splits.length}`, false).label("Parcelas").setType("number")

        const btnRemove = button("Remover").set("type", "button").style("danger")
        const row = div().class("d-flex", "gap-m", "ai-end").children(metodo, valor, parcelas, btnRemove)

        btnRemove.click(() => {
            const idx = this.splits.findIndex(s => s.el === row)
            if (idx > -1) {
                this.splits.splice(idx, 1)
                row.element.remove()
            }
        })

        this.splits.push({ metodo, valor, parcelas, el: row })
        this.splitContainer.children(row)
    }

    async onSubmit() {
        const data = this.getDataFromFields()
        const valorTotal = parseFloat(data.valor_total)

        const splits = this.splits.map(s => ({
            metodo: s.metodo.getValue(),
            valor: parseFloat(s.valor.getValue()) || 0,
            parcelas: parseInt(s.parcelas.getValue()) || 1,
        }))

        const somaSplits = splits.reduce((acc, s) => acc + s.valor, 0)
        if (Math.abs(somaSplits - valorTotal) > 0.01) {
            snackbar.show(`Soma dos splits (R$${somaSplits.toFixed(2)}) não bate com o total (R$${valorTotal.toFixed(2)})`, "error")
            return
        }

        const payload = {
            produto: data.produto,
            splits,
            cupom: data.cupom || undefined,
            valor_total: valorTotal,
            validade: data.validade || undefined,
        }

        const serverUrl = (process as any).env.SERVER_URL || window.location.origin
        const token = localStorage.getItem("accessToken")
        try {
            const res = await fetch(`${serverUrl}/api/checkout/build`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })
            const result = await res.json()
            if (!res.ok) {
                snackbar.show(result.error || "Erro ao criar checkout", "error")
                return
            }
            snackbar.show("Link de checkout criado com sucesso!", "success")
            this.triggerSubmit(result)
        } catch (err) {
            snackbar.show("Erro ao criar checkout", "error")
        }
    }
}
