import { div, span } from "zeyo";
import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import modal from "../../../components/molecules/modal";
import Modal from "../../../states/Modal";
import FormCreateAula from "../form/create";
import aulaComponent from "./crudComponent";
import configuracaoAula from "./configuracao";
import FormCreateCategoriaAula from "../../categoria-aula/form/create";
import importarVideosPanda from "./importarVideosPanda";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";

function buildAulaCrud(app: App, categoria?: string) {
    return CRUD(app, "Aulas", { create: "Criar Aula" }, {
        create: new FormCreateAula(app, categoria),
        read: categoria ? { categoria } : { categoria: { $exists: false } },
        update: (a, obj) => configuracaoAula(a, obj)
    }, aulaComponent)
}

function buildAulaTab(app: App, categorias: any[], categoriaAtual?: string) {
    const crud = buildAulaCrud(app, categoriaAtual)
    const selected = new Set<string>()

    const listaSelecao = div().class("d-grid", "gap-m")
    const barraAcoes = div().class("d-flex", "gap-m", "ai-center")
    barraAcoes.element.style.display = "none"

    const selectCategoria = document.createElement("select")
    selectCategoria.style.cssText = "padding: .5rem 1rem; border-radius: .5rem; border: 1px solid var(--accent); background: var(--background); color: var(--text); font-size: 1rem;"

    if (categoriaAtual) {
        const optSem = document.createElement("option")
        optSem.value = ""
        optSem.textContent = "Sem Categoria"
        selectCategoria.appendChild(optSem)
    }
    for (const cat of categorias) {
        if (cat._id === categoriaAtual) continue
        const opt = document.createElement("option")
        opt.value = cat._id
        opt.textContent = cat.titulo
        selectCategoria.appendChild(opt)
    }

    const btnMover = button("Mover").style("accent").style("p-s")
    btnMover.click(async () => {
        if (selected.size === 0) return
        const target = selectCategoria.value
        for (const id of selected) {
            const update: any = target ? { categoria: target } : {}
            if (!target) update.categoria = null
            await app.repository.update("Aulas", id, update)
        }
        snackbar.show(`${selected.size} aula(s) movida(s) com sucesso!`, "success")
        selected.clear()
        sairSelecao()
    })

    barraAcoes.element.appendChild(selectCategoria)
    barraAcoes.children(btnMover)

    const btnSelecionar = button("Selecionar").style("no-bg").style("p-s")
    const btnCancelar = button("Cancelar").style("no-bg").style("p-s")
    btnCancelar.element.style.display = "none"

    const contadorSelecao = span()
    contadorSelecao.element.style.cssText = "font-size: .9rem; color: var(--text); opacity: .7;"

    function atualizarContador() {
        contadorSelecao.text(selected.size > 0 ? `${selected.size} selecionada(s)` : "")
    }

    function entrarSelecao() {
        crud.element.style.display = "none"
        btnSelecionar.element.style.display = "none"
        btnCancelar.element.style.display = ""
        barraAcoes.element.style.display = ""
        listaSelecao.element.style.display = ""
        selected.clear()
        atualizarContador()
        carregarSelecao()
    }

    function sairSelecao() {
        crud.element.style.display = ""
        btnSelecionar.element.style.display = ""
        btnCancelar.element.style.display = "none"
        barraAcoes.element.style.display = "none"
        listaSelecao.element.style.display = "none"
        selected.clear()
        atualizarContador()
    }

    function carregarSelecao() {
        listaSelecao.HTML("")
        const query = categoriaAtual ? { categoria: categoriaAtual } : { categoria: { $exists: false } }
        app.repository.findMany("Aulas", query).then(([aulas, err]) => {
            if (err) return
            for (const aula of aulas) {
                const card = div().class("d-flex", "gap-m", "ai-center")
                card.element.style.cssText = "padding: 1rem; background: var(--background); border-radius: 1rem; cursor: pointer; border: 2px solid transparent; transition: border-color .2s;"

                const cb = document.createElement("input")
                cb.type = "checkbox"
                cb.style.cssText = "width: 18px; height: 18px; cursor: pointer; flex-shrink: 0;"

                const titulo = span().text(aula.title || "Sem título")

                card.element.prepend(cb)
                card.children(titulo)

                card.click((_o, e) => {
                    if ((e.target as HTMLElement).tagName === "INPUT") return
                    cb.checked = !cb.checked
                    toggleSelecao(aula._id, cb.checked, card)
                })

                cb.addEventListener("change", () => {
                    toggleSelecao(aula._id, cb.checked, card)
                })

                listaSelecao.children(card)
            }
        })
    }

    function toggleSelecao(id: string, checked: boolean, card: ReturnType<typeof div>) {
        if (checked) {
            selected.add(id)
            card.element.style.borderColor = "var(--accent)"
        } else {
            selected.delete(id)
            card.element.style.borderColor = "transparent"
        }
        atualizarContador()
    }

    btnSelecionar.click(entrarSelecao)
    btnCancelar.click(sairSelecao)

    listaSelecao.element.style.display = "none"

    const toolbar = div().class("d-flex", "gap-m", "ai-center")
    toolbar.children(btnSelecionar, btnCancelar, contadorSelecao)

    return div().class("d-grid", "gap-g").children(toolbar, barraAcoes, crud, listaSelecao)
}

export default (app: App) => div().class("d-grid", "gap-g").object(o => {
    const abasAulas = new Abas(app)

    app.repository.findMany("CategoriasAulas", {}).then(([categorias, err]) => {
        if (err) return

        abasAulas.push(new Aba("sem-categoria", "Sem Categoria", "iconInbox",
            buildAulaTab(app, categorias), true
        ))

        for (const cat of categorias) {
            abasAulas.push(new Aba(cat.value, cat.titulo, cat.icon || "iconFolder",
                buildAulaTab(app, categorias, cat._id)
            ))
        }

        abasAulas.push(new Aba("importar-panda", "Importar Panda", "iconVideo",
            importarVideosPanda(app)
        ))

        abasAulas.push(new Aba("add-categoria", "", "iconPlus",
            div()
        ))

        abasAulas.tabs.element.lastElementChild?.addEventListener("click", (e) => {
            e.stopPropagation()
            const form = new FormCreateCategoriaAula(app)
            form.setSubmitTrigger((data) => {
                window.history.back()
                if (!data) return
                app.repository.findMany("CategoriasAulas", { value: data.value }).then(([cats]) => {
                    const cat = cats[cats.length - 1]
                    if (!cat) return
                    const addTab = abasAulas.tabs.element.lastElementChild
                    const addSlide = abasAulas.display.element.lastElementChild

                    abasAulas.push(new Aba(cat.value, cat.titulo, cat.icon || "iconFolder",
                        buildAulaTab(app, categorias, cat._id)
                    ))

                    const newTab = abasAulas.tabs.element.lastElementChild
                    const newSlide = abasAulas.display.element.lastElementChild
                    if (addTab && newTab) abasAulas.tabs.element.insertBefore(newTab, addTab)
                    if (addSlide && newSlide) abasAulas.display.element.insertBefore(newSlide, addSlide)

                    abasAulas.changeSlide(abasAulas.element, cat.value)
                })
            })
            app.context.setState(Modal("create-categoria-aula", modal(app, form)))
            app.context.handle()
        })
    })

    o.children(abasAulas)
})
