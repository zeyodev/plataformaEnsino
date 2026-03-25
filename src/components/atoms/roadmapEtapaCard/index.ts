import { Div, div, h4, img, p, span } from "zeyo";
import style from "./style.module.css";
import App from "../../../app";

export default class RoadmapEtapaCard extends Div {
    private ordemEl = span().class(style.ordem)
    private tituloEl = h4().class(style.titulo)
    private motivoEl = p().class(style.motivo)
    private aulaInfoEl = div().class(style.aulaInfo)
    private aulaThumbEl = img().class(style.aulaThumb)
    private aulaTituloEl = p().class(style.aulaTitulo)
    private progressBarEl = div().class(style.progressBar)
    private progressFillEl = div().class(style.progressFill)
    private badgeEl = span().class(style.badgeConcluida)
    private etapaId = ""
    private onAulaClick: ((aula: any) => void) | null = null
    private aula: any = null

    constructor(private app?: App) {
        super()
        this.progressBarEl.children(this.progressFillEl)
        this.badgeEl.element.style.display = "none"
        this.class(style.etapa).children(
            div().class(style.header).children(
                this.ordemEl,
                this.tituloEl
            ),
            this.aulaInfoEl.children(
                this.aulaThumbEl,
                this.aulaTituloEl
            ),
            this.progressBarEl,
            this.badgeEl,
            this.motivoEl,
        )

        this.on("click", (_o, e) => {
            e.stopPropagation()
            if (this.aula && this.onAulaClick) this.onAulaClick(this.aula)
        })
    }

    setEtapaId(value: string) {
        this.etapaId = value
        this.attribute("data-id", value)
        this.attribute("id", `etapa-${value}`)
    }

    getEtapaId() { return this.etapaId }

    setOrdem(value: number) {
        this.ordemEl.text(String(value).padStart(2, "0"))
    }

    setTitulo(value: string) { this.tituloEl.text(value) }

    setMotivo(value: string) { this.motivoEl.text(value) }

    setAula(aula: any) {
        this.aula = aula
        if (aula?.thumbnail) this.aulaThumbEl.set("src", aula.thumbnail)
        if (aula?.title) this.aulaTituloEl.text(aula.title)
        if (!aula) this.aulaInfoEl.element.style.display = "none"
    }

    setOnAulaClick(callback: (aula: any) => void) {
        this.onAulaClick = callback
    }

    setProgress(progresso: number, concluida: boolean) {
        const pct = Math.min(100, Math.max(0, Math.round(progresso)))
        this.progressFillEl.element.style.width = `${pct}%`
        if (concluida) {
            this.element.classList.add(style.completed)
            this.badgeEl.text("Concluída ✓")
            this.badgeEl.element.style.display = "block"
        }
    }
}
