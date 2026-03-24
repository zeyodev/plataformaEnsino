import Z, { div, h3, p, span } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";

const css = (el: any, styles: Record<string, string>) => {
    el.object((o: any) => { Object.assign(o.element.style, styles) })
    return el
}

function pandaEmbed(videoPlayerUrl: string) {
    return Z("iframe").set("src", videoPlayerUrl)
        .object(o => {
            o.element.setAttribute("frameborder", "0")
            o.element.setAttribute("allowfullscreen", "")
            const s = o.element.style
            s.width = "100%"
            s.aspectRatio = "16/9"
            s.borderRadius = "8px"
            s.border = "none"
        })
}

export default (app: App, obj: any) => {
    const fileInput = Z("input").set("type", "file").set("accept", "video/*")
    css(fileInput, { display: "none" })

    const videoLocalPreview = Z("video").set("controls", true).set("muted", true)
    css(videoLocalPreview, {
        width: "100%", maxHeight: "360px", borderRadius: "8px", background: "#000"
    })

    const statusText = p()
    css(statusText, {
        margin: "0", fontSize: "0.9rem", color: "var(--text-400)",
        textAlign: "center", minHeight: "1.4em"
    })

    const progressBar = div()
    css(progressBar, {
        width: "100%", height: "6px", background: "var(--background-200)",
        borderRadius: "100px", overflow: "hidden", display: "none"
    })
    const progressFill = div()
    css(progressFill, {
        width: "0%", height: "100%",
        background: "linear-gradient(90deg, var(--accent), var(--secondary))",
        borderRadius: "100px", transition: "width 0.4s ease"
    })
    progressBar.children(progressFill)

    // Ícone de upload
    const uploadIcon = div()
    css(uploadIcon, {
        width: "56px", height: "56px", borderRadius: "50%",
        background: "var(--accent-50)", display: "flex",
        alignItems: "center", justifyContent: "center",
        transition: "transform 0.2s ease, background 0.2s ease"
    })
    uploadIcon.HTML(`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`)

    const dropLabel = span().text("Arraste o vídeo aqui ou clique para selecionar")
    css(dropLabel, { fontSize: "0.95rem", color: "var(--text-400)", fontWeight: "500" })

    const dropHint = span().text("MP4, MOV, AVI — até 2 GB")
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

    // Preview local do vídeo selecionado
    const localPreviewContainer = div().class("d-grid", "gap-m")
    css(localPreviewContainer, {
        display: "none", background: "var(--background-100)",
        borderRadius: "12px", padding: "1rem", overflow: "hidden"
    })
    const localPreviewLabel = span().text("Pré-visualização")
    css(localPreviewLabel, {
        fontSize: "0.8rem", fontWeight: "600", color: "var(--text-300)",
        textTransform: "uppercase", letterSpacing: "0.05em"
    })
    localPreviewContainer.children(localPreviewLabel, videoLocalPreview)

    fileInput.on("change", () => {
        const files = fileInput.element.files
        if (!files || !files[0]) return
        const file = files[0]
        // Mostrar nome do arquivo
        fileName.element.style.display = "block"
        fileName.text(`${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`)
        dropLabel.text("Arquivo selecionado:")
        // Preview local
        const reader = new FileReader()
        reader.onload = (e) => {
            videoLocalPreview.set("src", e.target?.result as string)
            localPreviewContainer.element.style.display = "grid"
        }
        reader.readAsDataURL(files[0])
    })

    // Container do vídeo atual (Panda embed)
    const videoContainer = div().class("d-grid", "gap-m")
    css(videoContainer, {
        background: "var(--background-100)", borderRadius: "12px",
        padding: "1rem", overflow: "hidden"
    })

    if (obj.video_player) {
        const currentLabel = span().text("Vídeo atual")
        css(currentLabel, {
            fontSize: "0.8rem", fontWeight: "600", color: "var(--text-300)",
            textTransform: "uppercase", letterSpacing: "0.05em"
        })
        videoContainer.children(currentLabel, pandaEmbed(obj.video_player))
        statusText.text(`Status: ${obj.status || "—"}`)
    } else {
        css(videoContainer, { display: "none" })
    }

    // Botão de enviar
    const uploadBtn = button("Enviar Vídeo").style("primary").set("type", "button")

    uploadBtn.click(async () => {
        const files = fileInput.element.files
        if (!files || !files[0]) return statusText.text("Selecione um vídeo primeiro.")

        const file = files[0]
        statusText.text("Enviando vídeo...")
        progressBar.element.style.display = "block"
        uploadBtn.element.style.pointerEvents = "none"
        uploadBtn.element.style.opacity = "0.6"

        app.socket.emit("upload-video-panda", {
            file,
            aula_id: obj._id,
            title: obj.title || "",
            info: { name: file.name, type: file.type, size: file.size }
        })

        app.socket.on(`upload-video-panda/${obj._id}/progress`, (data: any) => {
            const pct = Math.round(data.progress || 0)
            progressFill.element.style.width = `${pct}%`
            statusText.text(`Enviando... ${pct}%`)
        })

        app.socket.on(`upload-video-panda/${obj._id}/done`, async (data: any) => {
            statusText.text("Vídeo enviado com sucesso!")
            statusText.element.style.color = "var(--accent)"
            progressFill.element.style.width = "100%"
            uploadBtn.element.style.pointerEvents = "auto"
            uploadBtn.element.style.opacity = "1"

            if (data.video_player) {
                await app.repository.update("Aulas", obj._id, {
                    video_player: data.video_player,
                    video_hls: data.video_hls,
                    thumbnail: data.thumbnail,
                    status: data.status || "CONVERTING",
                    length: data.length || 0
                })
                const currentLabel = span().text("Vídeo atual")
                css(currentLabel, {
                    fontSize: "0.8rem", fontWeight: "600", color: "var(--text-300)",
                    textTransform: "uppercase", letterSpacing: "0.05em"
                })
                videoContainer.HTML("")
                videoContainer.children(currentLabel, pandaEmbed(data.video_player))
                videoContainer.element.style.display = "grid"
            }
        })

        app.socket.on(`upload-video-panda/${obj._id}/error`, (data: any) => {
            statusText.text(`Erro: ${data.message || "erro desconhecido"}`)
            statusText.element.style.color = "var(--secondary)"
            uploadBtn.element.style.pointerEvents = "auto"
            uploadBtn.element.style.opacity = "1"
            progressFill.element.style.width = "0%"
        })
    })

    // Header
    const title = h3().text("Upload de Vídeo")
    css(title, { margin: "0", fontSize: "1.2rem", fontWeight: "700", color: "var(--text)" })

    const subtitle = span().text("Panda Video")
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
        videoContainer,
        dropZone,
        localPreviewContainer,
        uploadBtn,
        progressBar,
        statusText
    )

    return container
}
