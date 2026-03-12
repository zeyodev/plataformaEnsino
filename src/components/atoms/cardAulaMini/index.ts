import { Div, div, img, p, span } from "zeyo";
import style from "./style.module.css";
import App from "../../../app";

function formatTempo(seconds: number): string {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    const pad = (n: number) => String(n).padStart(2, "0")
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}

export default class CardAulaMini extends Div {
    private imgEl = img()
    private tituloEl = p().class(style.titulo)
    private tempoEl = span().class(style.tempo)
    private badgeEl = span().class(style.badge).text("✓")
    aula: any

    constructor(private app?: App) {
        super()
        this.class(style.card).children(
            div().class(style.thumb).children(
                this.imgEl,
                this.tempoEl,
                this.badgeEl
            ),
            div().class(style.info).children(
                this.tituloEl
            )
        )
    }

    setAula(aula: any) {
        this.aula = aula
        if (aula?.thumbnail) this.imgEl.set("src", aula.thumbnail)
        if (aula?.title) this.tituloEl.text(aula.title)
        if (aula?.length) this.tempoEl.text(formatTempo(aula.length))
        if (aula?._id && this.app) this.checkConclusao(aula._id)
        return this
    }

    private async checkConclusao(aulaId: string) {
        const [conclusao] = await this.app!.repository.findOne("AulaConclusoes", { aulaId })
        if (conclusao && conclusao.concluida) {
            (this.badgeEl.element as HTMLElement).style.display = "inline-block"
        }
    }
}
