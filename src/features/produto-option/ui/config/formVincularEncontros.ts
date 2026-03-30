import { span } from "zeyo";
import App from "../../../../app";
import button from "../../../../components/atoms/button";
import snackbar from "../../../../components/atoms/snackbar";
import Form from "../../../../form";
import Input from "../../../../form/atoms/inputs";
import FieldCheckboxSpan from "../../../../form/fields/checkbox";

export default class FormVincularEncontros extends Form {
    private checkboxField: FieldCheckboxSpan

    constructor(private app: App, private produtoOptionId: string) {
        super()
        this.title.text("Vincular Categorias de Encontros")
        this.checkboxField = new FieldCheckboxSpan("encontros", true)

        const searchInput = new Input()
            .set("type", "text")
            .set("placeholder", "Buscar categoria...")

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

        this.loadCategorias()
    }

    private async loadCategorias() {
        const [[categorias], [vinculadas]] = await Promise.all([
            this.app.repository.findMany("CategoriasEncontros", {}),
            this.app.repository.findMany("ProdutoOptionEncontros", { produtoOption: this.produtoOptionId })
        ])
        const vinculadasIds = new Set(vinculadas.map((v: any) => v.categoriaEncontro))
        const disponiveis = categorias.filter((c: any) => !vinculadasIds.has(c._id))
        this.checkboxField.push(...disponiveis.map((c: any) => ({
            value: c._id,
            span: span(c.titulo || "Sem título")
        })))
    }

    async onSubmit() {
        const categoriasSelecionadas: string[] = this.checkboxField.getValue()
        if (categoriasSelecionadas.length === 0) return
        for (const categoriaId of categoriasSelecionadas) {
            await this.app.repository.create("ProdutoOptionEncontros", { categoriaEncontro: categoriaId, produtoOption: this.produtoOptionId })
        }
        snackbar.show("Categorias vinculadas com sucesso!", "success")
        this.triggerSubmit()
    }
}
