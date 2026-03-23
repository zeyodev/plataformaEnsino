import { div, h2, span } from "zeyo";
import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import FormUpdateProdutoOption from "../form/update";
import FieldCheckboxSpan from "../../../form/fields/checkbox";
import button from "../../../components/atoms/button";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("editar", "Editar Option", "iconSettings", new FormUpdateProdutoOption(app, obj), true))
        .push(new Aba("config", "Configuração", "iconLayers",
            div().class("d-grid", "gap-g", "ac-start", "p-10").object(async container => {
                if (obj.tipo === "pilares") {
                    container.children(h2("Selecione os Pilares"))
                    const field = new FieldCheckboxSpan("pilares", true)
                    const [pilares] = await app.repository.findMany("Pilares", {})
                    const selected: string[] = obj.config?.pilares || []
                    field.push(...pilares.map((p: any) => ({
                        value: p._id,
                        span: span(p.titulo)
                    })))
                    // marca os já selecionados
                    setTimeout(() => {
                        field.inputs.forEach(input => {
                            if (selected.includes(input.element.value)) {
                                input.element.checked = true
                                input.element.parentElement?.classList.add("checked")
                            }
                        })
                    }, 0)
                    const btnSalvar = button("Salvar Configuração").style("primary").click(async () => {
                        const pilaresSelecionados = field.getValue()
                        await app.repository.update("ProdutoOptions", obj._id, { config: { pilares: pilaresSelecionados } })
                    })
                    container.children(field, btnSalvar)

                } else if (obj.tipo === "jornadas") {
                    container.children(h2("Selecione as Jornadas"))
                    const field = new FieldCheckboxSpan("jornadas", true)
                    const [jornadas] = await app.repository.findMany("Jornadas", {})
                    const selected: string[] = obj.config?.jornadas || []
                    field.push(...jornadas.map((j: any) => ({
                        value: j._id,
                        span: span(j.titulo)
                    })))
                    setTimeout(() => {
                        field.inputs.forEach(input => {
                            if (selected.includes(input.element.value)) {
                                input.element.checked = true
                                input.element.parentElement?.classList.add("checked")
                            }
                        })
                    }, 0)
                    const btnSalvar = button("Salvar Configuração").style("primary").click(async () => {
                        const jornadasSelecionadas = field.getValue()
                        await app.repository.update("ProdutoOptions", obj._id, { config: { jornadas: jornadasSelecionadas } })
                    })
                    container.children(field, btnSalvar)

                } else if (obj.tipo === "encontros") {
                    container.children(h2("Selecione as Categorias de Encontros"))
                    const field = new FieldCheckboxSpan("encontros", true)
                    const [categorias] = await app.repository.findMany("CategoriasEncontros", {})
                    const selected: string[] = obj.config?.encontros || []
                    field.push(...categorias.map((c: any) => ({
                        value: c._id,
                        span: span(c.titulo)
                    })))
                    setTimeout(() => {
                        field.inputs.forEach(input => {
                            if (selected.includes(input.element.value)) {
                                input.element.checked = true
                                input.element.parentElement?.classList.add("checked")
                            }
                        })
                    }, 0)
                    const btnSalvar = button("Salvar Configuração").style("primary").click(async () => {
                        const encontrosSelecionados = field.getValue()
                        await app.repository.update("ProdutoOptions", obj._id, { config: { encontros: encontrosSelecionados } })
                    })
                    container.children(field, btnSalvar)
                }
            })
        ))
