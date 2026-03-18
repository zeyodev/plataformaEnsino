import Z, { div, h3, p, span } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";

export default (app: App, obj: any) => {
    const fileInput = Z("input").set("type", "file").set("accept", "video/*")
    const videoPreview = Z("video").set("width", 400).set("controls", true).set("muted", true)
    const statusText = p()
    const progressBar = div().object(o => { const s = o.element.style; s.width = "100%"; s.height = "8px"; s.background = "#e0e0e0"; s.borderRadius = "4px" })
    const progressFill = div().object(o => { const s = o.element.style; s.width = "0%"; s.height = "100%"; s.background = "#4caf50"; s.borderRadius = "4px"; s.transition = "width 0.3s" })
    progressBar.children(progressFill)

    if (obj.video_player) {
        videoPreview.set("src", obj.video_hls || obj.video_player)
        statusText.text(`Status: ${obj.status || "—"}`)
    }

    fileInput.on("change", () => {
        const files = fileInput.element.files
        if (!files || !files[0]) return
        const reader = new FileReader()
        reader.onload = (e) => {
            videoPreview.set("src", e.target?.result as string)
        }
        reader.readAsDataURL(files[0])
    })

    const uploadBtn = button("Enviar Vídeo").style("primary").set("type", "button").click(async () => {
        const files = fileInput.element.files
        if (!files || !files[0]) return statusText.text("Selecione um vídeo primeiro.")

        const file = files[0]
        statusText.text("Enviando vídeo...")

        const formData = new FormData()
        formData.append("file", file)
        formData.append("title", obj.title || "")
        formData.append("aula_id", obj._id)

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
            progressFill.element.style.width = "100%"

            if (data.video_player) {
                await app.repository.update("Aulas", obj._id, {
                    video_player: data.video_player,
                    video_hls: data.video_hls,
                    thumbnail: data.thumbnail,
                    status: data.status || "CONVERTING",
                    length: data.length || 0
                })
                videoPreview.set("src", data.video_hls || data.video_player)
            }
        })

        app.socket.on(`upload-video-panda/${obj._id}/error`, (data: any) => {
            statusText.text(`Erro ao enviar: ${data.message || "erro desconhecido"}`)
        })
    })

    return div().class("d-grid", "gap-g").children(
        h3().text("Upload de Vídeo - Panda Video"),
        obj.video_player
            ? div().class("d-grid", "gap-m").children(
                span().text("Vídeo atual:"),
                videoPreview
            )
            : div(),
        div().class("d-grid", "gap-m").children(
            fileInput,
            uploadBtn,
            progressBar,
            statusText
        )
    )
}
