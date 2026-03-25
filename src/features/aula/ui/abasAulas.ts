import { div, span } from "zeyo";
import App from "../../../app";
import modal from "../../../components/molecules/modal";
import Modal from "../../../states/Modal";
import FormCreateAula from "../form/create";
import configuracaoAula from "./configuracao";
import importarVideosPanda from "./importarVideosPanda";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import icon from "../../../components/atoms/icons";

function pastaCard(pasta: any) {
    const card = div().class("d-flex", "gap-m", "ai-center")
    card.element.style.cssText = "padding: 1rem; background: var(--background); border-radius: 1rem; cursor: pointer; transition: opacity .2s;"
    card.element.onmouseenter = () => card.element.style.opacity = "0.8"
    card.element.onmouseleave = () => card.element.style.opacity = "1"

    const icone = div()
    icone.element.innerHTML = icon("iconFolder").element.innerHTML
    icone.element.style.cssText = "flex-shrink: 0; width: 24px; height: 24px; opacity: .7;"

    const titulo = span().text(pasta.titulo || "Sem nome")
    titulo.element.style.fontWeight = "500"

    card.children(icone, titulo)
    return card
}

function aulaCard(aula: any) {
    const card = div().class("d-flex", "gap-m", "ai-center")
    card.element.style.cssText = "padding: 1rem; background: var(--background); border-radius: 1rem; cursor: pointer; transition: opacity .2s;"
    card.element.onmouseenter = () => card.element.style.opacity = "0.8"
    card.element.onmouseleave = () => card.element.style.opacity = "1"

    const icone = div()
    icone.element.innerHTML = icon("iconVideo").element.innerHTML
    icone.element.style.cssText = "flex-shrink: 0; width: 24px; height: 24px; opacity: .7;"

    const info = div().class("d-grid", "gap-s")
    const titulo = span().text(aula.title || "Sem título")
    titulo.element.style.fontWeight = "500"
    const desc = span().text(aula.description || "")
    desc.element.style.cssText = "font-size: .85rem; opacity: .6;"

    info.children(titulo, desc)
    card.children(icone, info)
    return card
}

class FormCreatePasta {
    element: HTMLFormElement
    private inputTitulo: HTMLInputElement
    private app: App
    private pastaId?: string
    onCreated?: (pasta: any) => void

    constructor(app: App, pastaId?: string) {
        this.app = app
        this.pastaId = pastaId

        this.element = document.createElement("form")
        this.element.style.cssText = "display: grid; gap: 1rem;"

        const title = document.createElement("h2")
        title.textContent = "Criar Pasta"
        title.style.margin = "0"

        const label = document.createElement("label")
        label.textContent = "Nome da pasta"
        label.style.cssText = "font-size: .9rem; font-weight: 500;"

        this.inputTitulo = document.createElement("input")
        this.inputTitulo.type = "text"
        this.inputTitulo.required = true
        this.inputTitulo.placeholder = "Nome da pasta"
        this.inputTitulo.style.cssText = "padding: .75rem 1rem; border-radius: .5rem; border: 1px solid var(--accent); background: var(--background); color: var(--text); font-size: 1rem;"

        const btn = document.createElement("button")
        btn.type = "submit"
        btn.textContent = "Criar"
        btn.style.cssText = "padding: .75rem 1.5rem; border-radius: .5rem; border: none; background: var(--accent); color: var(--background); font-size: 1rem; cursor: pointer;"

        this.element.appendChild(title)
        this.element.appendChild(label)
        this.element.appendChild(this.inputTitulo)
        this.element.appendChild(btn)

        this.element.onsubmit = async (e) => {
            e.preventDefault()
            const titulo = this.inputTitulo.value.trim()
            if (!titulo) return
            const data: any = { titulo }
            if (this.pastaId) data.pastaId = this.pastaId
            const [pasta] = await this.app.repository.create("Pastas", data)
            snackbar.show("Pasta criada com sucesso!", "success")
            window.history.back()
            if (this.onCreated) this.onCreated(pasta)
        }
    }
}

export default (app: App) => {
    const container = div().class("d-grid", "gap-g")
    const breadcrumb = div().class("d-flex", "gap-s", "ai-center")
    breadcrumb.element.style.cssText = "flex-wrap: wrap; font-size: .9rem;"
    const toolbar = div().class("d-flex", "gap-m", "ai-center")
    const lista = div().class("d-grid", "gap-m")
    const importarContainer = div()
    importarContainer.element.style.display = "none"

    let pastaAtual: string | undefined = undefined
    const pilhaPastas: { id?: string, titulo: string }[] = [{ titulo: "Aulas" }]

    function renderBreadcrumb() {
        breadcrumb.HTML("")
        for (let i = 0; i < pilhaPastas.length; i++) {
            const item = pilhaPastas[i]
            const isLast = i === pilhaPastas.length - 1

            const link = span().text(item.titulo)
            if (!isLast) {
                link.element.style.cssText = "cursor: pointer; color: var(--accent); text-decoration: underline;"
                const targetIndex = i
                link.click(() => {
                    pilhaPastas.length = targetIndex + 1
                    pastaAtual = pilhaPastas[targetIndex].id
                    carregarConteudo()
                })
            } else {
                link.element.style.cssText = "font-weight: 600;"
            }
            breadcrumb.children(link)
            if (!isLast) {
                const sep = span().text(" / ")
                sep.element.style.opacity = "0.5"
                breadcrumb.children(sep)
            }
        }
    }

    function navegarPasta(pasta: any) {
        pilhaPastas.push({ id: pasta._id, titulo: pasta.titulo })
        pastaAtual = pasta._id
        carregarConteudo()
    }

    async function carregarConteudo() {
        lista.HTML("")
        importarContainer.element.style.display = "none"
        renderBreadcrumb()

        const queryPastas = pastaAtual
            ? { pastaId: pastaAtual }
            : { pastaId: { $exists: false } }
        const queryAulas = pastaAtual
            ? { pastaId: pastaAtual }
            : { pastaId: { $exists: false } }

        const [[pastas, errP], [aulas, errA]] = await Promise.all([
            app.repository.findMany("Pastas", queryPastas),
            app.repository.findMany("Aulas", queryAulas)
        ])

        if (!errP && pastas.length > 0) {
            for (const pasta of pastas) {
                const card = pastaCard(pasta)
                card.click(() => navegarPasta(pasta))
                lista.children(card)
            }
        }

        if (!errA && aulas.length > 0) {
            for (const aula of aulas) {
                const card = aulaCard(aula)
                card.click(() => {
                    app.context.setState(Modal("update-aula", modal(app, configuracaoAula(app, aula))))
                    app.context.handle()
                })
                lista.children(card)
            }
        }

        if ((!pastas || pastas.length === 0) && (!aulas || aulas.length === 0)) {
            const vazio = div()
            vazio.element.style.cssText = "text-align: center; padding: 2rem; opacity: .5;"
            vazio.text("Esta pasta está vazia")
            lista.children(vazio)
        }
    }

    // Triggers para atualizar a lista quando houver mudanças
    app.repository.createTriggerTo("Pastas", () => carregarConteudo(), "create", "update", "delete")
    app.repository.createTriggerTo("Aulas", () => carregarConteudo(), "create", "update", "delete")

    // Botões
    const btnCriarPasta = button("Nova Pasta").style("no-bg").style("p-s")
    btnCriarPasta.click(() => {
        const form = new FormCreatePasta(app, pastaAtual)
        const wrapper = div()
        wrapper.element.appendChild(form.element)
        app.context.setState(Modal("create-pasta", modal(app, wrapper)))
        app.context.handle()
    })

    const btnCriarAula = button("Nova Aula").style("no-bg").style("p-s")
    btnCriarAula.click(() => {
        const form = new FormCreateAula(app, pastaAtual)
        form.setSubmitTrigger(() => window.history.back())
        app.context.setState(Modal("create-aula", modal(app, form)))
        app.context.handle()
    })

    const btnImportarPanda = button("Importar Panda").style("no-bg").style("p-s")
    let importarCarregado = false
    btnImportarPanda.click(() => {
        const visivel = importarContainer.element.style.display !== "none"
        if (visivel) {
            importarContainer.element.style.display = "none"
        } else {
            if (!importarCarregado) {
                importarContainer.children(importarVideosPanda(app, pastaAtual))
                importarCarregado = true
            }
            importarContainer.element.style.display = ""
        }
    })

    // Botão mover (seleção)
    const selected = new Set<{ id: string, tipo: "pasta" | "aula" }>()
    const listaSelecao = div().class("d-grid", "gap-m")
    listaSelecao.element.style.display = "none"
    const barraAcoes = div().class("d-flex", "gap-m", "ai-center")
    barraAcoes.element.style.display = "none"

    const btnSelecionar = button("Selecionar").style("no-bg").style("p-s")
    const btnCancelar = button("Cancelar").style("no-bg").style("p-s")
    btnCancelar.element.style.display = "none"
    const contadorSelecao = span()
    contadorSelecao.element.style.cssText = "font-size: .9rem; color: var(--text); opacity: .7;"

    function atualizarContador() {
        contadorSelecao.text(selected.size > 0 ? `${selected.size} selecionado(s)` : "")
    }

    async function moverSelecionados(destinoId: string | undefined, destinoLabel: string) {
        const itens = Array.from(selected)
        if (itens.length === 0) return
        for (const item of itens) {
            const collection = item.tipo === "pasta" ? "Pastas" : "Aulas"
            const update: any = {}
            if (destinoId) {
                update.pastaId = destinoId
            } else {
                update.pastaId = null
            }
            await app.repository.update(collection, item.id, update)
        }
        snackbar.show(`${itens.length} item(s) movido(s) para ${destinoLabel}!`, "success")
        selected.clear()
        sairSelecao()
    }

    function abrirModalMover() {
        if (selected.size === 0) {
            snackbar.show("Selecione ao menos um item para mover.", "error")
            return
        }

        const selectedIds = new Set<string>()
        for (const item of selected) {
            if (item.tipo === "pasta") selectedIds.add(item.id)
        }

        const wrapper = div().class("d-grid", "gap-g")
        const titulo = document.createElement("h2")
        titulo.textContent = "Mover para..."
        titulo.style.margin = "0"
        wrapper.element.appendChild(titulo)

        const listaPastas = div().class("d-grid", "gap-s")
        wrapper.children(listaPastas)

        // Opção Raiz
        const optRaiz = div().class("d-flex", "gap-m", "ai-center")
        optRaiz.element.style.cssText = "padding: .75rem 1rem; background: var(--background); border-radius: .75rem; cursor: pointer; border: 1px solid transparent; transition: border-color .2s;"
        optRaiz.element.onmouseenter = () => optRaiz.element.style.borderColor = "var(--accent)"
        optRaiz.element.onmouseleave = () => optRaiz.element.style.borderColor = "transparent"
        const iconeRaiz = div()
        iconeRaiz.element.innerHTML = icon("iconInbox").element.innerHTML
        iconeRaiz.element.style.cssText = "flex-shrink: 0; width: 20px; height: 20px; opacity: .7;"
        optRaiz.children(iconeRaiz, span().text("/ Raiz"))
        optRaiz.click(() => {
            window.history.back()
            moverSelecionados(undefined, "Raiz")
        })
        listaPastas.children(optRaiz)

        app.repository.findMany("Pastas", {}).then(([todasPastas, err]) => {
            if (err || !todasPastas) return

            const pastasMap = new Map<string, any>()
            for (const p of todasPastas) pastasMap.set(p._id, p)

            function buildPath(pasta: any): string {
                const parts: string[] = [pasta.titulo || "Sem nome"]
                let current = pasta
                while (current.pastaId && pastasMap.has(current.pastaId)) {
                    current = pastasMap.get(current.pastaId)!
                    parts.unshift(current.titulo || "Sem nome")
                }
                return "/ " + parts.join(" / ")
            }

            function isDescendantOf(pastaId: string, ancestorId: string): boolean {
                let cur = pastasMap.get(pastaId)
                while (cur) {
                    if (cur._id === ancestorId) return true
                    if (!cur.pastaId) return false
                    cur = pastasMap.get(cur.pastaId)
                }
                return false
            }

            for (const pasta of todasPastas) {
                if (selectedIds.has(pasta._id)) continue
                let skip = false
                for (const id of selectedIds) {
                    if (isDescendantOf(pasta._id, id)) { skip = true; break }
                }
                if (skip) continue

                const path = buildPath(pasta)
                const opt = div().class("d-flex", "gap-m", "ai-center")
                opt.element.style.cssText = "padding: .75rem 1rem; background: var(--background); border-radius: .75rem; cursor: pointer; border: 1px solid transparent; transition: border-color .2s;"
                opt.element.onmouseenter = () => opt.element.style.borderColor = "var(--accent)"
                opt.element.onmouseleave = () => opt.element.style.borderColor = "transparent"
                const iconeP = div()
                iconeP.element.innerHTML = icon("iconFolder").element.innerHTML
                iconeP.element.style.cssText = "flex-shrink: 0; width: 20px; height: 20px; opacity: .7;"
                opt.children(iconeP, span().text(path))
                opt.click(() => {
                    window.history.back()
                    moverSelecionados(pasta._id, path)
                })
                listaPastas.children(opt)
            }
        })

        app.context.setState(Modal("mover-para", modal(app, wrapper)))
        app.context.handle()
    }

    const btnMover = button("Mover para...").style("accent").style("p-s")
    btnMover.click(abrirModalMover)

    barraAcoes.children(btnMover)

    async function entrarSelecao() {
        lista.element.style.display = "none"
        btnSelecionar.element.style.display = "none"
        btnCancelar.element.style.display = ""
        barraAcoes.element.style.display = ""
        listaSelecao.element.style.display = ""
        selected.clear()
        atualizarContador()
        listaSelecao.HTML("")
        const queryPastas = pastaAtual
            ? { pastaId: pastaAtual }
            : { pastaId: { $exists: false } }
        const queryAulas = pastaAtual
            ? { pastaId: pastaAtual }
            : { pastaId: { $exists: false } }

        const [[pastas, errP], [aulas, errA]] = await Promise.all([
            app.repository.findMany("Pastas", queryPastas),
            app.repository.findMany("Aulas", queryAulas)
        ])

        if (!errP) {
            for (const pasta of pastas) {
                listaSelecao.children(buildSelecaoCard(pasta._id, pasta.titulo || "Sem nome", "pasta"))
            }
        }
        if (!errA) {
            for (const aula of aulas) {
                listaSelecao.children(buildSelecaoCard(aula._id, aula.title || "Sem título", "aula"))
            }
        }
    }

    function buildSelecaoCard(id: string, titulo: string, tipo: "pasta" | "aula") {
        const card = div().class("d-flex", "gap-m", "ai-center")
        card.element.style.cssText = "padding: 1rem; background: var(--background); border-radius: 1rem; cursor: pointer; border: 2px solid transparent; transition: border-color .2s;"

        const cb = document.createElement("input")
        cb.type = "checkbox"
        cb.style.cssText = "width: 18px; height: 18px; cursor: pointer; flex-shrink: 0;"

        const label = span().text(`${tipo === "pasta" ? "📁" : "🎬"} ${titulo}`)

        card.element.prepend(cb)
        card.children(label)

        const item = { id, tipo }

        card.click((_o, e) => {
            if ((e.target as HTMLElement).tagName === "INPUT") return
            cb.checked = !cb.checked
            toggleItem(item, cb.checked, card)
        })
        cb.addEventListener("change", () => toggleItem(item, cb.checked, card))

        return card
    }

    function toggleItem(item: { id: string, tipo: "pasta" | "aula" }, checked: boolean, card: ReturnType<typeof div>) {
        if (checked) {
            selected.add(item)
            card.element.style.borderColor = "var(--accent)"
        } else {
            selected.delete(item)
            card.element.style.borderColor = "transparent"
        }
        atualizarContador()
    }

    function sairSelecao() {
        lista.element.style.display = ""
        btnSelecionar.element.style.display = ""
        btnCancelar.element.style.display = "none"
        barraAcoes.element.style.display = "none"
        listaSelecao.element.style.display = "none"
        selected.clear()
        atualizarContador()
        carregarConteudo()
    }

    btnSelecionar.click(entrarSelecao)
    btnCancelar.click(sairSelecao)

    toolbar.children(btnCriarPasta, btnCriarAula, btnImportarPanda, btnSelecionar, btnCancelar, contadorSelecao)

    container.children(breadcrumb, toolbar, barraAcoes, lista, listaSelecao, importarContainer)

    carregarConteudo()

    return container
}
