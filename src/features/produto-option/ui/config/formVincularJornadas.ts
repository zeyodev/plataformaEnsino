import { span } from "zeyo";
import App from "../../../../app";
import button from "../../../../components/atoms/button";
import snackbar from "../../../../components/atoms/snackbar";
import Form from "../../../../form";
import Input from "../../../../form/atoms/inputs";
import FieldCheckboxSpan from "../../../../form/fields/checkbox";

export default class FormVincularJornadas extends Form {
    private checkboxField: FieldCheckboxSpan

    constructor(private app: App, private produtoOptionId: string) {
        super()
        this.title.text("Vincular Jornadas")
        this.checkboxField = new FieldCheckboxSpan("jornadas", true)

        const searchInput = new Input()
            .set("type", "text")
            .set("placeholder", "Buscar jornada...")

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

        this.loadJornadas()
    }

    private async loadJornadas() {
        const [[jornadas], [vinculadas]] = await Promise.all([
            this.app.repository.findMany("Jornadas", {}),
            this.app.repository.findMany("ProdutoOptionJornadas", { produtoOption: this.produtoOptionId })
        ])
        const vinculadasIds = new Set(vinculadas.map((v: any) => v.jornada))
        const disponiveis = jornadas.filter((j: any) => !vinculadasIds.has(j._id))
        this.checkboxField.push(...disponiveis.map((j: any) => ({
            value: j._id,
            span: span(j.titulo || "Sem título")
        })))
    }

    async onSubmit() {
        const jornadasSelecionadas: string[] = this.checkboxField.getValue()
        if (jornadasSelecionadas.length === 0) return
        for (const jornadaId of jornadasSelecionadas) {
            await this.app.repository.create("ProdutoOptionJornadas", { jornada: jornadaId, produtoOption: this.produtoOptionId })
        }
        snackbar.show("Jornadas vinculadas com sucesso!", "success")
        this.triggerSubmit()
    }
}
