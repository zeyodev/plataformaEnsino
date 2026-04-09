import { div, h3, img, span, Div } from "zeyo";
import App from "../../../app";
import styles from "./styles.module.css";

export default (app: App) => (new class extends Div {

    // 1. Definição dos Elementos (Propriedades Visuais)
    thumb = div().class(styles.VideoCard_thumb)
    thumbImg = img().class(styles.VideoCard_thumbImg)
    duration = span().class(styles.VideoCard_duration)
    badge = span().class(styles.VideoCard_badge).text("Concluída ✓")

    info = div().class(styles.VideoCard_info)
    titulo = h3().class(styles.VideoCard_title)

    aula: any
    setAula(aula: any) {
        const aulaId = aula?.aula || aula?._id
        this.aula = aulaId ? { ...aula, _id: aulaId } : aula
        if (aula?.thumbnail) this.thumbImg.attribute("src", aula.thumbnail)
        if (aula?.title) this.titulo.text(aula.title)
        if (aula?.length) this.duration.text(this.formatarTempo(aula.length))
        if (aulaId) this.checkConclusao(aulaId)
    }

    private formatarTempo(segundos: number): string {
        const h = Math.floor(segundos / 3600)
        const m = Math.floor((segundos % 3600) / 60)
        const s = Math.floor(segundos % 60)
        const pad = (n: number) => String(n).padStart(2, "0")
        return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
    }

    private async checkConclusao(aulaId: string) {
        const [conclusao] = await app.repository.findOne("AulaConclusoes", { aulaId })
        if (conclusao && conclusao.concluida) {
            (this.badge.element as HTMLElement).style.display = "inline-block"
        }
    }

    setImg(thumb: string) {
        this.thumbImg.attribute("src", thumb);
    }

}).class(styles.VideoCard_container).object(o => o.children(
    o.thumb.children(
        o.thumbImg,
        o.duration,
        o.badge
    ),
    o.info.children(
        o.titulo,
    )
)).click((o) => app.context.action("assistir", o.aula));
