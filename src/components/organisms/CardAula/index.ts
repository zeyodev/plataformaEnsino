import { div, h4, img, span } from "zeyo";
import App from "../../../app";
import Card from "../../atoms/card";
import style from "./style.module.css"

function formatTempo(seconds: number): string {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    const pad = (n: number) => String(n).padStart(2, "0")
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}

export default (app: App) => (new class extends Card {
    img = img()
    titulo = h4()
    tempo = span().class(style.tempo)
    badge = span().class(style.badge).text("Concluída ✓")
    aula: any
    setAula(aula: any) {
        this.aula = aula
        if (aula?.length) this.tempo.text(formatTempo(aula.length))
        if (aula?._id) this.checkConclusao(aula._id)
    }
    setImg(value: string) { this.img.set("src", value) }
    setTitulo(value: string) { this.titulo.text(value) }
    private async checkConclusao(aulaId: string) {
        const [conclusao] = await app.repository.findOne("AulaConclusoes", { aulaId })
        if (conclusao && conclusao.concluida) {
            (this.badge.element as HTMLElement).style.display = "inline-block"
        }
    }
}).class("d-grid", "gap-m", style.aula).object(o => o.children(
    div(
        o.img,
        o.tempo,
        o.badge,
    ).class(style.thumb),
    o.titulo
)).click((o) => app.context.action("assistir", o.aula))