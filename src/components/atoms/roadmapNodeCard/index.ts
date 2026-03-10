import { Div, div, h3, p, span } from "zeyo";
import style from "./style.module.css";
import icons from "../icons";
import CardAulaMini from "../cardAulaMini";

const themeClasses: { [key: string]: string } = {
    blue: style["theme-blue"],
    purple: style["theme-purple"],
    indigo: style["theme-indigo"],
    pink: style["theme-pink"],
    emerald: style["theme-emerald"],
    orange: style["theme-orange"],
    yellow: style["theme-yellow"],
    teal: style["theme-teal"],
    cyan: style["theme-cyan"],
    rose: style["theme-rose"],
};

export default class RoadmapNodeCard extends Div {
    private iconContainer = div().class(style.iconContainer)
    private titulo = h3().class(style.titulo)
    private descricao = p().class(style.descricao)
    private aulasPanel = div().class(style.aulasPanel)
    private aulasBadge = span().class(style.aulasBadge)
    private nodeId = ""
    private expanded = false
    private aulaCards: CardAulaMini[] = []
    private onAulaClick: ((aula: any) => void) | null = null

    constructor() {
        super()
        this.class(style.node).children(
            div().class(style.header).children(
                this.iconContainer,
                this.titulo,
                this.aulasBadge
            ),
            this.descricao,
            this.aulasPanel
        )

        this.on("click", (_o, e) => {
            e.stopPropagation()
            if (this.aulaCards.length > 0) this.toggleAulas()
        })
    }

    setNodeId(value: string) {
        this.nodeId = value
        this.attribute("data-id", value)
        this.attribute("id", `node-${value}`)
    }

    setTitulo(value: string) { this.titulo.text(value) }

    setDescricao(value: string) { this.descricao.text(value) }

    setIcon(value: string) {
        this.iconContainer.HTML("").children(icons(value as any))
    }

    setTheme(value: string) {
        const cls = themeClasses[value] || themeClasses.blue
        this.iconContainer.class(cls)
    }

    setAulas(aulas: any[]) {
        this.aulaCards = []
        this.aulasPanel.HTML("")

        if (aulas.length === 0) {
            this.aulasBadge.HTML("")
            return
        }

        this.aulasBadge.text(`${aulas.length} aulas`)

        for (const aula of aulas) {
            const card = new CardAulaMini()
            card.setAula(aula)
            card.on("click", (_o, e) => {
                e.stopPropagation()
                if (this.onAulaClick) this.onAulaClick(aula)
            })
            this.aulaCards.push(card)
            this.aulasPanel.children(card)
        }
    }

    setOnAulaClick(callback: (aula: any) => void) {
        this.onAulaClick = callback
    }

    private toggleAulas() {
        this.expanded = !this.expanded
        if (this.expanded) {
            this.aulasPanel.class(style.aulasPanelOpen)
        } else {
            this.element.classList.remove(style.aulasPanelOpen)
            this.aulasPanel.element.classList.remove(style.aulasPanelOpen)
        }
    }

    getNodeId() { return this.nodeId }
}
