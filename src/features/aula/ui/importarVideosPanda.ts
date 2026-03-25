import { div, h3, p, span, img } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";

function formatDuration(seconds: number): string {
    if (!seconds) return "--"
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
}

function videoCard(video: any, onSelect: (video: any) => void) {
    const selected = { value: false }
    const card = div().object(o => {
        const s = o.element.style
        s.border = "1px solid #ddd"
        s.borderRadius = "8px"
        s.padding = "8px"
        s.cursor = "pointer"
        s.display = "grid"
        s.gridTemplateColumns = "120px 1fr"
        s.gap = "12px"
        s.alignItems = "center"
    })

    const thumb = video.thumbnail
        ? img().set("src", video.thumbnail).object(o => {
            const s = o.element.style
            s.width = "120px"
            s.height = "68px"
            s.objectFit = "cover"
            s.borderRadius = "4px"
        })
        : div().object(o => {
            const s = o.element.style
            s.width = "120px"
            s.height = "68px"
            s.background = "#e0e0e0"
            s.borderRadius = "4px"
            s.display = "flex"
            s.alignItems = "center"
            s.justifyContent = "center"
        }).children(span().text("Sem thumb"))

    const info = div().class("d-grid", "gap-s").children(
        span().text(video.title || "Sem título").object(o => {
            o.element.style.fontWeight = "600"
        }),
        span().text(`Duração: ${formatDuration(video.length)}`).object(o => {
            o.element.style.fontSize = "12px"
            o.element.style.color = "#666"
        }),
        span().text(`Status: ${video.status || "—"}`).object(o => {
            o.element.style.fontSize = "12px"
            o.element.style.color = "#666"
        })
    )

    card.children(thumb, info)

    card.click(() => {
        selected.value = !selected.value
        card.element.style.border = selected.value ? "2px solid #4caf50" : "1px solid #ddd"
        card.element.style.background = selected.value ? "#f0fdf4" : ""
        onSelect(video)
    })

    return { card, setSelected(val: boolean) {
        selected.value = val
        card.element.style.border = val ? "2px solid #4caf50" : "1px solid #ddd"
        card.element.style.background = val ? "#f0fdf4" : ""
    }}
}

export default (app: App, pastaId?: string) => {
    const container = div().class("d-grid", "gap-g")
    const listContainer = div().class("d-grid", "gap-m")
    const paginationContainer = div().class("d-flex", "gap-m").object(o => {
        o.element.style.alignItems = "center"
    })
    const statusText = p()
    const selectedVideos: Map<string, any> = new Map()
    let currentCards: { card: any, video: any, setSelected: (v: boolean) => void }[] = []

    const loadBtn = button("Carregar Vídeos do Panda").style("primary").set("type", "button")
    const importBtn = button("Importar Selecionados").style("primary").set("type", "button")
    importBtn.element.style.display = "none"

    const selectAllBtn = button("Selecionar Todos").style("primary").set("type", "button")
    selectAllBtn.element.style.display = "none"
    let allSelected = false

    let totalPages = 1
    paginationContainer.element.style.display = "none"

    function pageBtn(label: string, page: number, active: boolean) {
        const btn = div().text(label).object(o => {
            const s = o.element.style
            s.minWidth = "36px"
            s.height = "36px"
            s.display = "flex"
            s.alignItems = "center"
            s.justifyContent = "center"
            s.border = "1px solid #ccc"
            s.borderRadius = "4px"
            s.cursor = "pointer"
            s.fontSize = "14px"
            s.userSelect = "none"
            if (active) {
                s.background = "#222"
                s.color = "#fff"
                s.borderColor = "#222"
            } else {
                s.background = "#fff"
                s.color = "#333"
            }
        })
        btn.click(() => loadPage(page))
        return btn
    }

    function renderPagination(page: number, lastPage: number) {
        paginationContainer.HTML("")
        paginationContainer.element.style.display = "flex"

        if (page > 1) paginationContainer.children(pageBtn("<", page - 1, false))

        const pages: (number | null)[] = []
        pages.push(1)
        if (page > 3) pages.push(null)
        for (let i = Math.max(2, page - 1); i <= Math.min(lastPage - 1, page + 1); i++) {
            pages.push(i)
        }
        if (page < lastPage - 2) pages.push(null)
        if (lastPage > 1) pages.push(lastPage)

        for (const p of pages) {
            if (p === null) {
                paginationContainer.children(
                    span().text("…").object(o => {
                        const s = o.element.style
                        s.minWidth = "36px"
                        s.height = "36px"
                        s.display = "flex"
                        s.alignItems = "center"
                        s.justifyContent = "center"
                        s.fontSize = "14px"
                        s.color = "#999"
                    })
                )
            } else {
                paginationContainer.children(pageBtn(String(p), p, p === page))
            }
        }

        if (page < lastPage) paginationContainer.children(pageBtn(">", page + 1, false))
    }

    function updateImportBtn() {
        importBtn.element.style.display = selectedVideos.size > 0 ? "" : "none"
        importBtn.text(`Importar ${selectedVideos.size} Selecionado(s)`)
    }

    function toggleSelectAll() {
        allSelected = !allSelected
        selectAllBtn.text(allSelected ? "Desmarcar Todos" : "Selecionar Todos")
        for (const item of currentCards) {
            item.setSelected(allSelected)
            if (allSelected) {
                selectedVideos.set(item.video.id, item.video)
            } else {
                selectedVideos.delete(item.video.id)
            }
        }
        updateImportBtn()
    }

    selectAllBtn.click(toggleSelectAll)

    async function loadPage(page: number): Promise<any> {
        statusText.text("Carregando vídeos...")
        listContainer.HTML("")
        currentCards = []
        allSelected = false
        selectAllBtn.text("Selecionar Todos")
        selectedVideos.clear()
        importBtn.element.style.display = "none"
        paginationContainer.element.style.display = "none"
        selectAllBtn.element.style.display = "none"

        const event = `list-videos-panda/${app.msgId()}`
        app.socket.emit(event, { page, limit: 50 })
        const [result, err] = await app.socket.wait(event, 30000)

        if (err) {
            const msg = typeof result === "string" ? result : result?.error || "Falha ao carregar vídeos"
            statusText.text(`Erro: ${msg}`)
            return
        }

        const videos: any[] = result?.videos || []
        if (videos.length === 0) {
            statusText.text(page === 1
                ? "Nenhum vídeo encontrado no Panda Video."
                : "Todos os vídeos já foram importados.")
            return
        }

        // Buscar vídeos já importados para filtrar
        const [aulas] = await app.repository.findMany("Aulas", {})
        const importedPlayers = new Set<string>()
        if (aulas && Array.isArray(aulas)) {
            for (const aula of aulas) {
                if (aula.video_player) importedPlayers.add(aula.video_player)
            }
        }

        const filtered = videos.filter(v => !importedPlayers.has(v.video_player))
        const hasNextPage = videos.length === 50

        if (filtered.length === 0) {
            if (hasNextPage) {
                statusText.text(`Página ${page}: todos já importados, avançando...`)
                return loadPage(page + 1)
            }
            statusText.text("Todos os vídeos já foram importados.")
            return
        }

        // Paginação
        totalPages = hasNextPage ? Math.max(totalPages, page + 1) : page
        renderPagination(page, totalPages)

        const ignorados = videos.length - filtered.length
        const ignoradosTxt = ignorados > 0 ? ` (${ignorados} já importado(s))` : ""
        statusText.text(`${filtered.length} vídeos disponíveis.${ignoradosTxt} Selecione para importar:`)

        if (filtered.length > 0) {
            selectAllBtn.element.style.display = ""
        }

        for (const video of filtered) {
            const item = videoCard(video, (v) => {
                if (selectedVideos.has(v.id)) {
                    selectedVideos.delete(v.id)
                } else {
                    selectedVideos.set(v.id, v)
                }
                updateImportBtn()
            })
            currentCards.push({ card: item.card, video, setSelected: item.setSelected })
            listContainer.children(item.card)
        }
    }

    loadBtn.click(() => { totalPages = 1; loadPage(1) })

    importBtn.click(async () => {
        if (selectedVideos.size === 0) return

        importBtn.element.setAttribute("disabled", "true")
        statusText.text("Importando aulas...")

        let count = 0
        for (const [, video] of selectedVideos) {
            const data: any = {
                title: video.title || "Sem título",
                description: video.description || "",
                status: video.status || "CONVERTED",
                playable: video.status === "CONVERTED",
                video_player: video.video_player || "",
                video_hls: video.video_hls || "",
                thumbnail: video.thumbnail || "",
                length: video.length || 0,
            }
            if (pastaId) data.pastaId = pastaId

            await app.repository.create("Aulas", data)
            count++
            statusText.text(`Importando... ${count}/${selectedVideos.size}`)
        }

        snackbar.show(`${count} aula(s) importada(s) com sucesso!`, "success")
        statusText.text(`${count} aula(s) importada(s) com sucesso!`)
        selectedVideos.clear()
        importBtn.element.style.display = "none"
        importBtn.element.removeAttribute("disabled")
        selectAllBtn.element.style.display = "none"
        currentCards = []
    })

    container.children(
        h3().text("Importar Vídeos - Panda Video"),
        div().class("d-grid", "gap-m").children(
            loadBtn,
            paginationContainer,
            statusText,
            div().class("d-flex", "gap-m").children(selectAllBtn, importBtn),
            listContainer,
        )
    )

    return container
}
