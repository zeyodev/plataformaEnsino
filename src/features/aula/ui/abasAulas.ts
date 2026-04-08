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

type SelectedItem = { id: string; tipo: "pasta" | "aula" }

function sectionHeader(titulo: string, count: number) {
    const wrapper = div().class("d-flex", "gap-m", "ai-center")
    wrapper.element.style.marginBottom = ".25rem"

    const label = span().text(titulo)
    label.element.style.cssText = "font-weight:600; font-size:.85rem; color:var(--on-surface-variant); text-transform:uppercase; letter-spacing:.05rem;"

    const badge = span().text(String(count))
    badge.element.style.cssText = "font-size:.75rem; font-weight:600; color:var(--on-surface-variant); background:var(--surface-container-highest); padding:2px 8px; border-radius:10px;"

    wrapper.children(label, badge)
    return wrapper
}

function pastaCard(
    pasta: any,
    modoSelecao: boolean,
    selected: Set<SelectedItem>,
    onToggle: () => void
) {
    const card = div().class("card", "d-grid", "gap-m")
    card.element.style.cssText = "cursor:pointer; border:2px solid transparent; transition:background-color .15s, border-color .15s;"

    const icone = div()
    icone.element.innerHTML = icon("iconFolder").element.innerHTML
    icone.element.style.cssText = "width:44px; height:44px; color:var(--primary);"

    const info = div().class("d-grid", "gap-p")
    const titulo = span().text(pasta.titulo || "Sem nome")
    titulo.element.style.cssText = "font-weight:600; font-size:.95rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
    const tipo = span().text("Pasta")
    tipo.element.style.cssText = "font-size:.75rem; color:var(--on-surface-variant);"
    info.children(titulo, tipo)

    card.element.onmouseenter = () => card.element.style.backgroundColor = "var(--surface-container-highest)"
    card.element.onmouseleave = () => card.element.style.backgroundColor = ""

    if (modoSelecao) {
        const cb = document.createElement("input")
        cb.type = "checkbox"
        cb.style.cssText = "width:16px; height:16px; cursor:pointer; flex-shrink:0; pointer-events:none; position:absolute; top:.75rem; right:.75rem;"
        card.element.style.position = "relative"
        card.element.appendChild(cb)

        const item: SelectedItem = { id: pasta._id, tipo: "pasta" }
        card.click(() => {
            const found = [...selected].find(s => s.id === item.id)
            if (found) {
                selected.delete(found)
                cb.checked = false
                card.element.style.borderColor = "transparent"
            } else {
                selected.add(item)
                cb.checked = true
                card.element.style.borderColor = "var(--primary)"
            }
            onToggle()
        })
    }

    card.children(icone, info)
    return card
}

function aulaCard(
    aula: any,
    modoSelecao: boolean,
    selected: Set<SelectedItem>,
    onToggle: () => void
) {
    const card = div().class("d-flex", "gap-m", "ai-center")
    card.element.style.cssText = "padding:.75rem 1rem; border-radius:.75rem; border:2px solid transparent; cursor:pointer; transition:background-color .15s, border-color .15s;"

    const icone = div()
    icone.element.innerHTML = icon("iconVideo").element.innerHTML
    icone.element.style.cssText = "flex-shrink:0; width:36px; height:36px; color:var(--on-surface-variant);"

    const info = div().class("d-grid", "gap-p")
    info.element.style.cssText = "flex:1; min-width:0;"
    const titulo = span().text(aula.title || "Sem título")
    titulo.element.style.fontWeight = "500"
    const desc = span().text(aula.description || "")
    desc.element.style.cssText = "font-size:.82rem; color:var(--on-surface-variant); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
    info.children(titulo, desc)

    card.element.onmouseenter = () => card.element.style.backgroundColor = "var(--surface-container-high)"
    card.element.onmouseleave = () => card.element.style.backgroundColor = ""

    if (modoSelecao) {
        const cb = document.createElement("input")
        cb.type = "checkbox"
        cb.style.cssText = "width:16px; height:16px; cursor:pointer; flex-shrink:0; pointer-events:none;"

        const item: SelectedItem = { id: aula._id, tipo: "aula" }
        card.click(() => {
            const found = [...selected].find(s => s.id === item.id)
            if (found) {
                selected.delete(found)
                cb.checked = false
                card.element.style.borderColor = "transparent"
            } else {
                selected.add(item)
                cb.checked = true
                card.element.style.borderColor = "var(--primary)"
            }
            onToggle()
        })

        card.element.prepend(cb)
    }

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

    // Toolbar: breadcrumb (esquerda) + botões (direita)
    const toolbar = div().class("d-flex", "jc-between", "ai-center", "gap-m", "w-100")
    const leftSide = div().class("d-flex", "gap-p", "ai-center")
    leftSide.element.style.cssText = "flex-wrap:wrap; font-size:.9rem; flex:1; min-width:0;"
    const rightSide = div().class("d-flex", "gap-m", "ai-center")

    const breadcrumb = div().class("d-flex", "gap-p", "ai-center")
    breadcrumb.element.style.flexWrap = "wrap"

    const lista = div().class("d-grid", "gap-g")
    const importarContainer = div()
    importarContainer.element.style.display = "none"

    let pastaAtual: string | undefined = undefined
    let modoSelecao = false
    const pilhaPastas: { id?: string, titulo: string }[] = [{ titulo: "Aulas" }]

    function renderBreadcrumb() {
        breadcrumb.HTML("")
        for (let i = 0; i < pilhaPastas.length; i++) {
            const item = pilhaPastas[i]
            const isLast = i === pilhaPastas.length - 1

            const link = span().text(item.titulo)
            if (!isLast) {
                link.element.style.cssText = "cursor: pointer; color: var(--primary); text-decoration: underline;"
                const targetIndex = i
                link.click(() => {
                    pilhaPastas.length = targetIndex + 1
                    pastaAtual = pilhaPastas[targetIndex].id
                    carregarConteudo()
                })
            } else {
                link.element.style.fontWeight = "600"
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

        const temPastas = !errP && pastas && pastas.length > 0
        const temAulas = !errA && aulas && aulas.length > 0

        if (temPastas) {
            const secao = div().class("d-grid", "gap-m")
            secao.children(sectionHeader("Pastas", pastas.length))

            const grid = div()
            grid.element.style.cssText = "display:grid; grid-template-columns:repeat(auto-fill, minmax(180px,1fr)); gap:1em;"

            for (const pasta of pastas) {
                const card = pastaCard(pasta, modoSelecao, selected, atualizarContador)
                if (!modoSelecao) {
                    card.click(() => navegarPasta(pasta))
                }
                grid.children(card)
            }

            secao.children(grid)
            lista.children(secao)
        }

        if (temAulas) {
            const secao = div().class("d-grid", "gap-m")
            secao.children(sectionHeader("Aulas", aulas.length))

            const listaAulas = div().class("d-grid", "gap-p")
            for (const aula of aulas) {
                const card = aulaCard(aula, modoSelecao, selected, atualizarContador)
                if (!modoSelecao) {
                    card.click(() => {
                        app.context.setState(Modal("update-aula", modal(app, configuracaoAula(app, aula))))
                        app.context.handle()
                    })
                }
                listaAulas.children(card)
            }

            secao.children(listaAulas)
            lista.children(secao)
        }

        if (!temPastas && !temAulas) {
            const vazio = div().class("d-grid", "jc-center", "ac-center")
            vazio.element.style.cssText = "padding:3rem 1rem; text-align:center;"

            const iconeVazio = div()
            iconeVazio.element.innerHTML = icon("iconFolderOpen").element.innerHTML
            iconeVazio.element.style.cssText = "width:48px; height:48px; opacity:.4; margin:0 auto;"

            const texto = span().text("Esta pasta está vazia")
            texto.element.style.cssText = "font-size:.95rem; color:var(--on-surface-variant); display:block; margin-top:.75rem;"

            vazio.children(iconeVazio, texto)
            lista.children(vazio)
        }
    }

    // Triggers para atualizar a lista quando houver mudanças
    app.repository.createTriggerTo("Pastas", () => carregarConteudo(), "create", "update", "delete")
    app.repository.createTriggerTo("Aulas", () => carregarConteudo(), "create", "update", "delete")

    // Botões
    const btnCriarPasta = button("+ Nova Pasta").style("no-bg").style("p-s")
    btnCriarPasta.click(() => {
        const form = new FormCreatePasta(app, pastaAtual)
        const wrapper = div()
        wrapper.element.appendChild(form.element)
        app.context.setState(Modal("create-pasta", modal(app, wrapper)))
        app.context.handle()
    })

    const btnCriarAula = button("+ Nova Aula").style("accent").style("p-s")
    btnCriarAula.click(() => {
        const form = new FormCreateAula(app, pastaAtual)
        form.setSubmitTrigger(() => window.history.back())
        app.context.setState(Modal("create-aula", modal(app, form)))
        app.context.handle()
    })

    const btnImportarPanda = button("Importar").style("no-bg").style("p-s")
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

    // Seleção
    const selected = new Set<SelectedItem>()
    const barraAcoes = div().class("d-flex", "gap-m", "ai-center")
    barraAcoes.element.style.display = "none"

    const btnSelecionar = button("Selecionar").style("no-bg").style("p-s")
    const btnCancelar = button("Cancelar").style("no-bg").style("p-s")
    btnCancelar.element.style.display = "none"
    const contadorSelecao = span()
    contadorSelecao.element.style.cssText = "font-size:.9rem; color:var(--on-surface-variant);"

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

        const listaPastas = div().class("d-grid", "gap-p")
        wrapper.children(listaPastas)

        const optRaiz = div().class("d-flex", "gap-m", "ai-center")
        optRaiz.element.style.cssText = "padding:.75rem 1rem; background:var(--surface-container-high); border-radius:.75rem; cursor:pointer; border:1px solid transparent; transition:border-color .2s;"
        optRaiz.element.onmouseenter = () => optRaiz.element.style.borderColor = "var(--primary)"
        optRaiz.element.onmouseleave = () => optRaiz.element.style.borderColor = "transparent"
        const iconeRaiz = div()
        iconeRaiz.element.innerHTML = icon("iconInbox").element.innerHTML
        iconeRaiz.element.style.cssText = "flex-shrink:0; width:20px; height:20px; opacity:.7;"
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
                opt.element.style.cssText = "padding:.75rem 1rem; background:var(--surface-container-high); border-radius:.75rem; cursor:pointer; border:1px solid transparent; transition:border-color .2s;"
                opt.element.onmouseenter = () => opt.element.style.borderColor = "var(--primary)"
                opt.element.onmouseleave = () => opt.element.style.borderColor = "transparent"
                const iconeP = div()
                iconeP.element.innerHTML = icon("iconFolder").element.innerHTML
                iconeP.element.style.cssText = "flex-shrink:0; width:20px; height:20px; opacity:.7;"
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

    function entrarSelecao() {
        modoSelecao = true
        selected.clear()
        atualizarContador()
        btnSelecionar.element.style.display = "none"
        btnCancelar.element.style.display = ""
        barraAcoes.element.style.display = ""
        carregarConteudo()
    }

    function sairSelecao() {
        modoSelecao = false
        selected.clear()
        atualizarContador()
        btnSelecionar.element.style.display = ""
        btnCancelar.element.style.display = "none"
        barraAcoes.element.style.display = "none"
        carregarConteudo()
    }

    btnSelecionar.click(entrarSelecao)
    btnCancelar.click(sairSelecao)

    leftSide.children(breadcrumb)
    rightSide.children(btnCriarPasta, btnCriarAula, btnImportarPanda, btnSelecionar, btnCancelar, contadorSelecao)
    toolbar.children(leftSide, rightSide)

    container.children(toolbar, barraAcoes, lista, importarContainer)

    carregarConteudo()

    return container
}
