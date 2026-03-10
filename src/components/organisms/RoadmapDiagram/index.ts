import { Div, div } from "zeyo";
import App from "../../../app";
import style from "./style.module.css";
import nodeStyle from "../../atoms/roadmapNodeCard/style.module.css";
import RoadmapNodeCard from "../../atoms/roadmapNodeCard";

interface NodeData {
    _id: string;
    tier: number;
    titulo: string;
    descricao: string;
    icon: string;
    theme: string;
}

interface ConnectionData {
    _id: string;
    jornada: string;
    from: string;
    to: string;
}

export default class RoadmapDiagram extends Div {
    private svgOverlay: SVGSVGElement
    private nodesContainer = div().class(style.nodesContainer)
    private drawnPaths: SVGPathElement[] = []
    private drawnArrows: SVGPolygonElement[] = []
    private nodeElements: Map<string, RoadmapNodeCard> = new Map()
    private connections: ConnectionData[] = []
    private resizeObserver: ResizeObserver | null = null

    constructor(private app: App) {
        super()
        this.svgOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.svgOverlay.classList.add(style.svgOverlay)
        this.class(style.container)
        this.element.appendChild(this.svgOverlay)
        this.children(this.nodesContainer)
    }

    setNodes(nodes: NodeData[]) {
        const grouped = nodes.reduce((acc, node) => {
            acc[node.tier] = acc[node.tier] || []
            acc[node.tier].push(node)
            return acc
        }, {} as Record<number, NodeData[]>)

        const sortedTiers = Object.keys(grouped).sort((a, b) => +a - +b)

        for (const tierStr of sortedTiers) {
            const tierDiv = div().class(style.tier)
            for (const node of grouped[+tierStr]) {
                const card = new RoadmapNodeCard()
                card.setNodeId(node._id)
                card.setTitulo(node.titulo)
                card.setDescricao(node.descricao)
                card.setIcon(node.icon)
                card.setTheme(node.theme)
                card.on("mouseenter", () => this.highlightNode(node._id))
                card.on("mouseleave", () => this.clearHighlight())
                card.setOnAulaClick((aula: any) => {
                    this.app.context.action("assistir", aula)
                })
                this.nodeElements.set(node._id, card)
                tierDiv.children(card)

                this.loadNodeAulas(node._id, card)
            }
            this.nodesContainer.children(tierDiv)
        }
    }

    private async loadNodeAulas(nodeId: string, card: RoadmapNodeCard) {
        const [nodeAulas] = await this.app.repository.findManyToMany(
            "NodeAulas/aula:Aulas",
            { node: nodeId }
        )
        if (nodeAulas && nodeAulas.length > 0) {
            card.setAulas(nodeAulas)
        }
    }

    setConnections(connections: ConnectionData[]) {
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

        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
        this.svgOverlay.appendChild(defs)

        for (const conn of this.connections) {
            const fromCard = this.nodeElements.get(conn.from)
            const toCard = this.nodeElements.get(conn.to)
            if (!fromCard || !toCard) continue

            const fromRect = fromCard.element.getBoundingClientRect()
            const toRect = toCard.element.getBoundingClientRect()

            const startX = (fromRect.left + fromRect.width / 2) - containerRect.left
            const startY = fromRect.bottom - containerRect.top
            const endX = (toRect.left + toRect.width / 2) - containerRect.left
            const endY = toRect.top - containerRect.top
            const curvature = Math.min(Math.abs(endY - startY) / 2, 80)

            const arrowY = endY
            const arrowSize = 6
            const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
            arrow.setAttribute("points",
                `${endX},${arrowY} ${endX - arrowSize},${arrowY - arrowSize * 1.8} ${endX + arrowSize},${arrowY - arrowSize * 1.8}`
            )
            arrow.style.fill = "var(--neutral-500)"
            arrow.dataset.from = conn.from
            arrow.dataset.to = conn.to
            arrow.classList.add(style.connectionArrow)

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
            path.setAttribute("d",
                `M ${startX} ${startY} C ${startX} ${startY + curvature}, ${endX} ${endY - curvature}, ${endX} ${endY - arrowSize * 1.8}`
            )
            path.setAttribute("fill", "none")
            path.style.stroke = "var(--neutral-500)"
            path.setAttribute("stroke-width", "2")
            path.classList.add(style.connectionPath)
            path.dataset.from = conn.from
            path.dataset.to = conn.to
            this.svgOverlay.appendChild(path)
            this.drawnPaths.push(path)

            this.svgOverlay.appendChild(arrow)
            this.drawnArrows.push(arrow)
        }
    }

    private highlightNode(nodeId: string) {
        this.nodeElements.forEach(card => {
            card.element.classList.add(nodeStyle.dimmed)
        })
        this.drawnPaths.forEach(p => p.classList.add(style.dimmedPath))
        this.drawnArrows.forEach(a => a.classList.add(style.dimmedPath))

        const current = this.nodeElements.get(nodeId)
        if (current) {
            current.element.classList.remove(nodeStyle.dimmed)
            current.element.classList.add(nodeStyle.highlighted)
        }

        for (let i = 0; i < this.drawnPaths.length; i++) {
            const path = this.drawnPaths[i]
            const arrow = this.drawnArrows[i]
            const isOutgoing = path.dataset.from === nodeId
            const isIncoming = path.dataset.to === nodeId

            if (isOutgoing || isIncoming) {
                path.classList.remove(style.dimmedPath)
                path.classList.add(style.activePath)
                if (arrow) {
                    arrow.classList.remove(style.dimmedPath)
                    arrow.classList.add(style.activeArrow)
                }

                const connectedId = isOutgoing ? path.dataset.to! : path.dataset.from!
                const connected = this.nodeElements.get(connectedId)
                if (connected) {
                    connected.element.classList.remove(nodeStyle.dimmed)
                    connected.element.classList.add(nodeStyle.highlighted)
                }
            }
        }
    }

    private clearHighlight() {
        this.nodeElements.forEach(card => {
            card.element.classList.remove(nodeStyle.dimmed, nodeStyle.highlighted)
        })
        this.drawnPaths.forEach(p => {
            p.classList.remove(style.dimmedPath, style.activePath)
        })
        this.drawnArrows.forEach(a => {
            a.classList.remove(style.dimmedPath, style.activeArrow)
        })
    }
}
