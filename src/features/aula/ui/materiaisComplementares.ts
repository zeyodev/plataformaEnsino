import Z, { div, h3, p, span } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";
import icons from "../../../components/atoms/icons";

const css = (el: any, styles: Record<string, string>) => {
    el.object((o: any) => { Object.assign(o.element.style, styles) })
    return el
}

export default (app: App, obj: any) => {
    const statusText = p()
    css(statusText, {
        margin: "0", fontSize: "0.9rem", color: "var(--text-400)",
        textAlign: "center", minHeight: "1.4em"
    })

    const fileInput = Z("input").set("type", "file").set("multiple", true)
    css(fileInput, { display: "none" })

    const nomeInput = Z("input").set("type", "text").set("placeholder", "Nome do material (opcional)")
    css(nomeInput, {
        padding: "0.75rem 1rem", borderRadius: "10px",
        border: "1.5px solid var(--background-300)", background: "var(--background-100)",
        fontSize: "0.95rem", color: "var(--text)", outline: "none",
        transition: "border-color 0.2s ease"
    })
    nomeInput.on("focus", () => { nomeInput.element.style.borderColor = "var(--accent)" })
    nomeInput.on("blur", () => { nomeInput.element.style.borderColor = "var(--background-300)" })

    // Ícone de upload
    const uploadIcon = div()
    css(uploadIcon, {
        width: "56px", height: "56px", borderRadius: "50%",
        background: "var(--accent-50)", display: "flex",
        alignItems: "center", justifyContent: "center",
        transition: "transform 0.2s ease, background 0.2s ease"
    })
    uploadIcon.HTML(`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`)

    const dropLabel = span().text("Arraste os arquivos aqui ou clique para selecionar")
    css(dropLabel, { fontSize: "0.95rem", color: "var(--text-400)", fontWeight: "500" })

    const dropHint = span().text("PDF, DOC, PPT, ZIP e outros")
    css(dropHint, { fontSize: "0.8rem", color: "var(--text-300)" })

    const fileName = span()
    css(fileName, {
        fontSize: "0.85rem", color: "var(--accent)", fontWeight: "600",
        display: "none", wordBreak: "break-all", textAlign: "center"
    })

    // Drop zone
    const dropZone = div().class("d-grid", "gap-m")
    css(dropZone, {
        border: "2px dashed var(--background-300)", borderRadius: "12px",
        padding: "2.5rem 1.5rem", cursor: "pointer", textAlign: "center",
        transition: "border-color 0.2s ease, background 0.2s ease",
        justifyItems: "center", alignContent: "center"
    })
    dropZone.children(uploadIcon, dropLabel, dropHint, fileName, fileInput)

    const setDropActive = (active: boolean) => {
        const el = dropZone.element as HTMLElement
        const iconEl = uploadIcon.element as HTMLElement
        if (active) {
            el.style.borderColor = "var(--accent)"
            el.style.background = "var(--accent-50)"
            iconEl.style.transform = "scale(1.1)"
            iconEl.style.background = "var(--accent-100)"
        } else {
            el.style.borderColor = "var(--background-300)"
            el.style.background = "transparent"
            iconEl.style.transform = "scale(1)"
            iconEl.style.background = "var(--accent-50)"
        }
    }

    dropZone.on("click", () => fileInput.element.click())
    dropZone.on("dragover", (_o: any, e: DragEvent) => { e.preventDefault(); setDropActive(true) })
    dropZone.on("dragleave", () => setDropActive(false))
    dropZone.on("drop", (_o: any, e: DragEvent) => {
        e.preventDefault()
        setDropActive(false)
        if (e.dataTransfer?.files?.length) {
            fileInput.element.files = e.dataTransfer.files
            fileInput.element.dispatchEvent(new Event("change"))
        }
    })

    fileInput.on("change", () => {
        const files = fileInput.element.files
        if (!files || !files.length) return
        const fnEl = fileName.element as HTMLElement
        fnEl.style.display = "block"
        if (files.length === 1) {
            const f = files[0]
            fileName.text(`${f.name} (${(f.size / 1024 / 1024).toFixed(1)} MB)`)
        } else {
            const totalSize = Array.from(files).reduce((s, f) => s + f.size, 0)
            fileName.text(`${files.length} arquivos (${(totalSize / 1024 / 1024).toFixed(1)} MB)`)
        }
        dropLabel.text("Arquivos selecionados:")
    })

    // Lista de materiais
    const listaContainer = div().class("d-grid", "gap-m")

    const emptyState = div().class("d-grid", "gap-m")
    css(emptyState, {
        padding: "1.5rem", textAlign: "center", borderRadius: "12px",
        background: "var(--background-100)"
    })
    const emptyText = p().text("Nenhum material adicionado.")
    css(emptyText, { margin: "0", fontSize: "0.9rem", color: "var(--text-300)" })
    emptyState.children(emptyText)

    function renderMaterial(mat: any) {
        const fileIcon = icons("iconFile")
        css(fileIcon, { flexShrink: "0" })

        const materialName = span().text(mat.nome || mat.url)
        css(materialName, {
            flex: "1", fontSize: "0.9rem", fontWeight: "500",
            color: "var(--text)", overflow: "hidden",
            textOverflow: "ellipsis", whiteSpace: "nowrap"
        })

        const downloadBtn = button("Baixar").style("secondary").set("type", "button")
        css(downloadBtn, {
            padding: "0.4rem 0.8rem", fontSize: "0.8rem",
            borderRadius: "8px", flexShrink: "0"
        })

        const downloadLink = Z("a").set("href", mat.url).set("target", "_blank").set("download", mat.nome || "")
        css(downloadLink, { textDecoration: "none" })
        downloadLink.children(downloadBtn)

        const removeBtn = button("Remover").set("type", "button")
        css(removeBtn, {
            padding: "0.4rem 0.8rem", fontSize: "0.8rem",
            borderRadius: "8px", flexShrink: "0",
            background: "var(--secondary-50)", color: "var(--secondary)",
            border: "none", cursor: "pointer",
            transition: "background 0.2s ease"
        })
        removeBtn.on("mouseenter", () => { removeBtn.element.style.background = "var(--secondary-100)" })
        removeBtn.on("mouseleave", () => { removeBtn.element.style.background = "var(--secondary-50)" })
        removeBtn.click(async () => {
            await app.repository.delete("AulaMateriaisComplementares", mat._id)
            loadMateriais()
        })

        const card = div().class("d-flex", "gap-m", "ai-center")
        css(card, {
            padding: "0.75rem 1rem", borderRadius: "10px",
            background: "var(--background-100)",
            transition: "background 0.15s ease"
        })
        card.on("mouseenter", () => { card.element.style.background = "var(--background-200)" })
        card.on("mouseleave", () => { card.element.style.background = "var(--background-100)" })
        card.children(fileIcon, materialName, downloadLink, removeBtn)

        return card
    }

    async function loadMateriais() {
        const [materiais, err] = await app.repository.findMany("AulaMateriaisComplementares", { aulaId: obj._id })
        listaContainer.element.innerHTML = ""
        if (err || !materiais.length) {
            listaContainer.element.appendChild(emptyState.element)
            return
        }
        const listLabel = span().text(`${materiais.length} material(is)`)
        css(listLabel, {
            fontSize: "0.8rem", fontWeight: "600", color: "var(--text-300)",
            textTransform: "uppercase", letterSpacing: "0.05em"
        })
        listaContainer.element.appendChild(listLabel.element)
        for (const mat of materiais) {
            listaContainer.element.appendChild(renderMaterial(mat).element)
        }
    }

    loadMateriais()

    // Botão de enviar
    const uploadBtn = button("Adicionar Material").style("primary").set("type", "button")

    uploadBtn.click(async () => {
        const files = fileInput.element.files
        if (!files || !files[0]) return statusText.text("Selecione um arquivo.")

        const nome = nomeInput.element.value || files[0].name
        statusText.text("Enviando material...")
        uploadBtn.element.style.pointerEvents = "none"
        uploadBtn.element.style.opacity = "0.6"

        for (const file of Array.from(files)) {
            app.socket.emit("upload-material", {
                file,
                aula_id: obj._id,
                nome: nome,
                info: { name: file.name, type: file.type, size: file.size }
            })
        }

        app.socket.on(`upload-material/${obj._id}/done`, async (data: any) => {
            await app.repository.create("AulaMateriaisComplementares", {
                aulaId: obj._id,
                nome: data.nome || nome,
                url: data.url,
                tipo: data.tipo || files[0].type
            })
            statusText.text("Material adicionado!")
            statusText.element.style.color = "var(--accent)"
            nomeInput.element.value = ""
            fileInput.element.value = ""
            fileName.element.style.display = "none"
            dropLabel.text("Arraste os arquivos aqui ou clique para selecionar")
            uploadBtn.element.style.pointerEvents = "auto"
            uploadBtn.element.style.opacity = "1"
            loadMateriais()
        })

        app.socket.on(`upload-material/${obj._id}/error`, (data: any) => {
            statusText.text(`Erro: ${data.message || "erro ao enviar material"}`)
            statusText.element.style.color = "var(--secondary)"
            uploadBtn.element.style.pointerEvents = "auto"
            uploadBtn.element.style.opacity = "1"
        })
    })

    // Header
    const title = h3().text("Materiais Complementares")
    css(title, { margin: "0", fontSize: "1.2rem", fontWeight: "700", color: "var(--text)" })

    const subtitle = span().text("Arquivos da aula")
    css(subtitle, {
        fontSize: "0.8rem", fontWeight: "500", color: "var(--text-300)",
        textTransform: "uppercase", letterSpacing: "0.08em"
    })

    const header = div().class("d-grid", "gap-p")
    css(header, { justifyItems: "start" })
    header.children(subtitle, title)

    // Container principal
    const container = div().class("d-grid", "gap-g")
    css(container, {
        padding: "1.5rem", borderRadius: "16px",
        background: "var(--background)", maxWidth: "calc(100% - 3rem)"
    })

    container.children(
        header,
        listaContainer,
        dropZone,
        nomeInput,
        uploadBtn,
        statusText
    )

    return container
}
