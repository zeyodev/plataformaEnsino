import Z, { div, h3, p, span } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";
import icons from "../../../components/atoms/icons";

export default (app: App, obj: any) => {
    const listaContainer = div().class("d-grid", "gap-m")
    const statusText = p()
    const fileInput = Z("input").set("type", "file").set("multiple", true)
    const nomeInput = Z("input").set("type", "text").set("placeholder", "Nome do material")

    function renderMaterial(mat: any) {
        return div().class("d-flex", "gap-m", "ai-center").object(o => { const s = o.element.style; s.padding = "8px"; s.border = "1px solid #e0e0e0"; s.borderRadius = "4px" }).children(
            icons("iconFile"),
            span().object(o => o.element.style.flex = "1").text(mat.nome || mat.url),
            Z("a").set("href", mat.url).set("target", "_blank").set("download", mat.nome || "").children(
                button("Baixar").style("secondary").set("type", "button")
            ),
            button("Remover").style("danger").set("type", "button").click(async () => {
                await app.repository.delete("AulaMateriaisComplementares", mat._id)
                loadMateriais()
            })
        )
    }

    async function loadMateriais() {
        const [materiais, err] = await app.repository.findMany("AulaMateriaisComplementares", { aulaId: obj._id })
        listaContainer.element.innerHTML = ""
        if (err || !materiais.length) {
            listaContainer.children(p().text("Nenhum material adicionado."))
            return
        }
        for (const mat of materiais) {
            listaContainer.element.appendChild(renderMaterial(mat).element)
        }
    }

    loadMateriais()

    const uploadBtn = button("Adicionar Material").style("primary").set("type", "button").click(async () => {
        const files = fileInput.element.files
        if (!files || !files[0]) return statusText.text("Selecione um arquivo.")

        const nome = nomeInput.element.value || files[0].name
        statusText.text("Enviando material...")

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
            nomeInput.element.value = ""
            fileInput.element.value = ""
            loadMateriais()
        })

        app.socket.on(`upload-material/${obj._id}/error`, (data: any) => {
            statusText.text(`Erro: ${data.message || "erro ao enviar material"}`)
        })
    })

    return div().class("d-grid", "gap-g").children(
        h3().text("Materiais Complementares"),
        div().class("d-grid", "gap-m").children(
            nomeInput,
            fileInput,
            uploadBtn,
        ),
        statusText,
        listaContainer
    )
}
