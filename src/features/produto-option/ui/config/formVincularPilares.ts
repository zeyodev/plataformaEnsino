import { span } from "zeyo";
import App from "../../../../app";
import button from "../../../../components/atoms/button";
import snackbar from "../../../../components/atoms/snackbar";
import Form from "../../../../form";
import Input from "../../../../form/atoms/inputs";
import FieldCheckboxSpan from "../../../../form/fields/checkbox";

export default class FormVincularPilares extends Form {
    private checkboxField: FieldCheckboxSpan

    constructor(private app: App, private produtoOptionId: string) {
        super()
        this.title.text("Vincular Pilares")
        this.checkboxField = new FieldCheckboxSpan("pilares", true)

        const searchInput = new Input()
            .set("type", "text")
            .set("placeholder", "Buscar pilar...")

        searchInput.object(el => {
            el.element.oninput = () => {
                const term = (el.element as HTMLInputElement).value.toLowerCase()
                this.checkboxField.inputs.forEach(input => {
                    const label = input.element.parentElement
                    if (!label) return
                    const text = label.textContent?.toLowerCase() || ""
                    label.style.display = text.includes(term) ? "" : "none"
                })
            }
        })

        this.body.children(searchInput, this.checkboxField)
        this.footer.children(
            button("Vincular").set("type", "submit").style("primary")
        )

        this.loadPilares()
    }

    private async loadPilares() {
        const [[pilares], [vinculados]] = await Promise.all([
            this.app.repository.findMany("Pilares", {}),
            this.app.repository.findMany("ProdutoOptionPilares", { produtoOption: this.produtoOptionId })
        ])
        const vinculadosIds = new Set(vinculados.map((v: any) => v.pilar))
        const disponiveis = pilares.filter((p: any) => !vinculadosIds.has(p._id))
        this.checkboxField.push(...disponiveis.map((p: any) => ({
            value: p._id,
            span: span(p.titulo || "Sem título")
        })))
    }

    async onSubmit() {
        const piaresSelecionados: string[] = this.checkboxField.getValue()
        if (piaresSelecionados.length === 0) return
        for (const pilarId of piaresSelecionados) {
            await this.app.repository.create("ProdutoOptionPilares", { pilar: pilarId, produtoOption: this.produtoOptionId })
        }
        snackbar.show("Pilares vinculados com sucesso!", "success")
        this.triggerSubmit()
    }
}
