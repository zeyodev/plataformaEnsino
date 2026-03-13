import { Div, div, h3, p, span } from "zeyo";
import App from "../../../app";
import style from "./style.module.css";
import etapaStyle from "../../atoms/roadmapEtapaCard/style.module.css";
import RoadmapEtapaCard from "../../atoms/roadmapEtapaCard";
import icons from "../../atoms/icons";

interface FaseData {
    _id: string;
    jornada: string;
    ordem: number;
    titulo: string;
    descricao: string;
    icon: string;
    theme: string;
}

interface EtapaData {
    _id: string;
    fase: string;
    ordem: number;
    aula: string;
    titulo: string;
    motivo: string;
}

interface EtapaConnectionData {
    _id: string;
    jornada: string;
    from: string;
    to: string;
}

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

export default class RoadmapDiagram extends Div {
    private svgOverlay: SVGSVGElement
    private nodesContainer = div().class(style.nodesContainer)
    private drawnPaths: SVGPathElement[] = []
    private drawnArrows: SVGPolygonElement[] = []
    private etapaElements: Map<string, RoadmapEtapaCard> = new Map()
    private connections: EtapaConnectionData[] = []
    private resizeObserver: ResizeObserver | null = null
    private etapaFaseMap: Map<string, string> = new Map()
    private faseEtapaOrder: Map<string, string[]> = new Map()

    constructor(private app: App) {
        super()
        this.svgOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.svgOverlay.classList.add(style.svgOverlay)
        this.class(style.container)
        this.element.appendChild(this.svgOverlay)
        this.children(this.nodesContainer)
    }

    setFases(fases: FaseData[], etapas: EtapaData[]) {
        const sortedFases = [...fases].sort((a, b) => a.ordem - b.ordem)

        for (const fase of sortedFases) {
            const faseEtapas = etapas
                .filter(e => e.fase === fase._id)
                .sort((a, b) => a.ordem - b.ordem)

            const iconContainer = div().class(style.faseIconContainer)
            const themeCls = themeClasses[fase.theme] || themeClasses.blue
            iconContainer.class(themeCls)
            iconContainer.children(icons(fase.icon as any))

            const etapasContainer = div().class(style.etapasContainer)

            const faseEtapaIds: string[] = []
            for (const etapa of faseEtapas) {
                this.etapaFaseMap.set(etapa._id, fase._id)
                faseEtapaIds.push(etapa._id)
                const card = new RoadmapEtapaCard(this.app)
                card.setEtapaId(etapa._id)
                card.setOrdem(etapa.ordem)
                card.setTitulo(etapa.titulo)
                card.setMotivo(etapa.motivo)
                card.setOnAulaClick((aula: any) => {
                    this.app.context.action("assistir", aula)
                })
                card.on("mouseenter", () => this.highlightEtapa(etapa._id))
                card.on("mouseleave", () => this.clearHighlight())
                this.etapaElements.set(etapa._id, card)
                etapasContainer.children(card)

                this.loadEtapaAula(etapa.aula, card)
            }

            this.faseEtapaOrder.set(fase._id, faseEtapaIds)

            const faseDiv = div().class(style.fase).children(
                div().class(style.faseHeader).children(
                    iconContainer,
                    div().children(
                        span().class(style.faseOrdem).text(`Fase ${fase.ordem}`),
                        h3().class(style.faseTitulo).text(fase.titulo)
                    )
                ),
                p().class(style.faseDescricao).text(fase.descricao),
                etapasContainer
            )

            this.nodesContainer.children(faseDiv)
        }
    }

    private async loadEtapaAula(aulaId: string, card: RoadmapEtapaCard) {
        const [aula] = await this.app.repository.findOne("Aulas", { _id: aulaId })
        if (aula) {
            card.setAula(aula)
        }
    }

    setConnections(connections: EtapaConnectionData[]) {
        this.connections = connections
        requestAnimationFrame(() => this.drawConnections())
        this.resizeObserver = new ResizeObserver(() => this.drawConnections())
        this.resizeObserver.observe(this.element)
    }

    private drawConnections() {
        this.svgOverlay.innerHTML = ""
        this.drawnPaths = []
        this.drawnArrows = []

        if (this.connections.length === 0) return

        const containerRect = this.element.getBoundingClientRect()
        if (containerRect.width === 0 || containerRect.height === 0) return

        this.svgOverlay.setAttribute("width", String(containerRect.width))
        this.svgOverlay.setAttribute("height", String(containerRect.height))

        const arrowSize = 6

        for (const conn of this.connections) {
            const fromCard = this.etapaElements.get(conn.from)
            const toCard = this.etapaElements.get(conn.to)
            if (!fromCard || !toCard) continue

            const fromFase = this.etapaFaseMap.get(conn.from)
            const toFase = this.etapaFaseMap.get(conn.to)
            const fromRect = fromCard.element.getBoundingClientRect()
            const toRect = toCard.element.getBoundingClientRect()

            if (fromFase && toFase && fromFase !== toFase) {
                // Entre fases: lateral direita → topo da primeira etapa
                const startX = fromRect.right - containerRect.left
                const startY = (fromRect.top + fromRect.height / 2) - containerRect.top
                const endX = (toRect.left + toRect.width / 2) - containerRect.left
                const endY = toRect.top - containerRect.top

                const d = `M ${startX} ${startY} C ${startX + 60} ${startY}, ${endX + 60} ${endY - 40}, ${endX} ${endY + arrowSize * 1.8}`
                this.drawPath(d, conn)
                this.drawArrowDown(endX, endY, arrowSize, conn)
            } else {
                // Dentro da fase: alternando baixo/cima
                const faseEtapas = fromFase ? this.faseEtapaOrder.get(fromFase) : null
                const fromIndex = faseEtapas ? faseEtapas.indexOf(conn.from) : 0
                const isBottom = fromIndex % 2 === 0

                const startX = (fromRect.left + fromRect.width / 2) - containerRect.left
                const endX = (toRect.left + toRect.width / 2) - containerRect.left

                if (isBottom) {
                    // Conexão por baixo
                    const startY = fromRect.bottom - containerRect.top
                    const endY = toRect.bottom - containerRect.top
                    const curvature = 40

                    const d = `M ${startX} ${startY} C ${startX} ${startY + curvature}, ${endX} ${endY + curvature}, ${endX} ${endY - arrowSize * 1.8}`
                    this.drawPath(d, conn)
                    this.drawArrowUp(endX, endY, arrowSize, conn)
                } else {
                    // Conexão por cima
                    const startY = fromRect.top - containerRect.top
                    const endY = toRect.top - containerRect.top
                    const curvature = 40

                    const d = `M ${startX} ${startY} C ${startX} ${startY - curvature}, ${endX} ${endY - curvature}, ${endX} ${endY + arrowSize * 1.8}`
                    this.drawPath(d, conn)
                    this.drawArrowDown(endX, endY, arrowSize, conn)
                }
            }
        }
    }

    private drawPath(d: string, conn: EtapaConnectionData) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("d", d)
        path.setAttribute("fill", "none")
        path.style.stroke = "var(--neutral-500)"
        path.setAttribute("stroke-width", "2")
        path.classList.add(style.connectionPath)
        path.dataset.from = conn.from
        path.dataset.to = conn.to
        this.svgOverlay.appendChild(path)
        this.drawnPaths.push(path)
    }

    private drawArrowDown(x: number, y: number, size: number, conn: EtapaConnectionData) {
        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        arrow.setAttribute("points",
            `${x},${y} ${x - size},${y - size * 1.8} ${x + size},${y - size * 1.8}`
        )
        arrow.style.fill = "var(--neutral-500)"
        arrow.dataset.from = conn.from
        arrow.dataset.to = conn.to
        arrow.classList.add(style.connectionArrow)
        this.svgOverlay.appendChild(arrow)
        this.drawnArrows.push(arrow)
    }

    private drawArrowUp(x: number, y: number, size: number, conn: EtapaConnectionData) {
        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        arrow.setAttribute("points",
            `${x},${y} ${x - size},${y + size * 1.8} ${x + size},${y + size * 1.8}`
        )
        arrow.style.fill = "var(--neutral-500)"
        arrow.dataset.from = conn.from
        arrow.dataset.to = conn.to
        arrow.classList.add(style.connectionArrow)
        this.svgOverlay.appendChild(arrow)
        this.drawnArrows.push(arrow)
    }

    private highlightEtapa(etapaId: string) {
        this.etapaElements.forEach(card => {
            card.element.classList.add(etapaStyle.dimmed)
        })
        this.drawnPaths.forEach(p => p.classList.add(style.dimmedPath))
        this.drawnArrows.forEach(a => a.classList.add(style.dimmedPath))

        const current = this.etapaElements.get(etapaId)
        if (current) {
            current.element.classList.remove(etapaStyle.dimmed)
            current.element.classList.add(etapaStyle.highlighted)
        }

        for (let i = 0; i < this.drawnPaths.length; i++) {
            const path = this.drawnPaths[i]
            const arrow = this.drawnArrows[i]
            const isOutgoing = path.dataset.from === etapaId
            const isIncoming = path.dataset.to === etapaId

            if (isOutgoing || isIncoming) {
                path.classList.remove(style.dimmedPath)
                path.classList.add(style.activePath)
                if (arrow) {
                    arrow.classList.remove(style.dimmedPath)
                    arrow.classList.add(style.activeArrow)
                }

                const connectedId = isOutgoing ? path.dataset.to! : path.dataset.from!
                const connected = this.etapaElements.get(connectedId)
                if (connected) {
                    connected.element.classList.remove(etapaStyle.dimmed)
                    connected.element.classList.add(etapaStyle.highlighted)
                }
            }
        }
    }

    private clearHighlight() {
        this.etapaElements.forEach(card => {
            card.element.classList.remove(etapaStyle.dimmed, etapaStyle.highlighted)
        })
        this.drawnPaths.forEach(p => {
            p.classList.remove(style.dimmedPath, style.activePath)
        })
        this.drawnArrows.forEach(a => {
            a.classList.remove(style.dimmedPath, style.activeArrow)
        })
    }
}
