import Z, { div, h3, p } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";

export default (app: App, obj: any) => {
    const textarea = Z("textarea")
        .object(o => { const s = o.element.style; s.width = "100%"; s.minHeight = "300px"; s.padding = "10px"; s.fontFamily = "inherit"; s.fontSize = "14px"; s.resize = "vertical" })
    const statusText = p()

    app.repository.findOne("AulaTranscricoes", { aulaId: obj._id }).then(([transcricao]) => {
        if (transcricao && transcricao.texto) {
            textarea.element.value = transcricao.texto
        }
    })

    const salvarBtn = button("Salvar Transcrição").style("primary").set("type", "button").click(async () => {
        const texto = textarea.element.value
        const [existing] = await app.repository.findOne("AulaTranscricoes", { aulaId: obj._id })
        if (existing && existing._id) {
            await app.repository.update("AulaTranscricoes", existing._id, { texto })
        } else {
            await app.repository.create("AulaTranscricoes", { aulaId: obj._id, texto })
        }
        statusText.text("Transcrição salva!")
    })

    const gerarBtn = button("Gerar Transcrição Automática").style("secondary").set("type", "button").click(async () => {
        if (!obj.video_hls && !obj.video_player) {
            return statusText.text("Envie o vídeo primeiro para gerar a transcrição.")
        }
        statusText.text("Gerando transcrição...")

        app.socket.emit("gerar-transcricao", { aula_id: obj._id })

        app.socket.on(`gerar-transcricao/${obj._id}/done`, (data: any) => {
            if (data.texto) {
                textarea.element.value = data.texto
                statusText.text("Transcrição gerada com sucesso!")
            }
        })

        app.socket.on(`gerar-transcricao/${obj._id}/error`, (data: any) => {
            statusText.text(`Erro: ${data.message || "erro ao gerar transcrição"}`)
        })
    })

    return div().class("d-grid", "gap-g").children(
        h3().text("Transcrição da Aula"),
        div().class("d-flex", "gap-m").children(
            salvarBtn,
            gerarBtn
        ),
        textarea,
        statusText
    )
}
