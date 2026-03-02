import { Div, div, h3, p } from "zeyo";
import style from "./style.module.css";
import icons from "../icons";

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
    private nodeId = ""

    constructor() {
        super()
        this.class(style.node).children(
            div().class(style.header).children(
                this.iconContainer,
                this.titulo
            ),
            this.descricao
        )
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

    getNodeId() { return this.nodeId }
}
