import { span } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import Input from "../../../form/atoms/inputs";
import FieldCheckboxSpan from "../../../form/fields/checkbox";

export default class FormVincularAulasModulo extends Form {
    private checkboxField: FieldCheckboxSpan

    constructor(private app: App, private moduloId: string) {
        super()
        this.title.text("Vincular Aulas")
        this.checkboxField = new FieldCheckboxSpan("aulas", true)

        const searchInput = new Input()
            .set("type", "text")
            .set("placeholder", "Buscar aula...")

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

        this.loadAulas()
    }

    private async loadAulas() {
        const [[aulas], [vinculadas]] = await Promise.all([
            this.app.repository.findMany("Aulas", {}),
            this.app.repository.findMany("ModuloAulas", { modulo: this.moduloId })
        ])
        const vinculadasIds = new Set(vinculadas.map((v: any) => v.aula))
        const disponiveis = aulas.filter((a: any) => !vinculadasIds.has(a._id))
        this.checkboxField.push(...disponiveis.map((a: any) => ({
            value: a._id,
            span: span(a.title || "Sem título")
        })))
    }

    async onSubmit() {
        const aulasSelecionadas: string[] = this.checkboxField.getValue()
        if (aulasSelecionadas.length === 0) return
        for (const aulaId of aulasSelecionadas) {
            await this.app.repository.create("ModuloAulas", { aula: aulaId, modulo: this.moduloId })
        }
        snackbar.show("Aulas vinculadas com sucesso!", "success")
        this.triggerSubmit()
    }
}
