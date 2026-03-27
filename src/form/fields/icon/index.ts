import Z, { ZeyoAs } from "zeyo"
import Field from "../field"
import { getIcon, getAllIconNames } from "../../../icons/lucideCatalog"
import style from "./style.module.css"

const iconKeys = getAllIconNames()

export default class FieldIcon extends Field {
    private value: string = ""
    private grid: ZeyoAs<"div">
    private preview: ZeyoAs<"div">
    private searchInput: ZeyoAs<"input">
    private items: Map<string, ZeyoAs<"div">> = new Map()

    constructor(key: string, toData?: boolean) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            this.preview = Z("div").class(style.preview),
            this.searchInput = Z("input")
                .class(style.search)
                .set("type", "text")
                .set("placeholder", "Buscar ícone..."),
            this.grid = Z("div").class(style.container),
        )
        this.searchInput.element.oninput = () => this.filter(this.searchInput.element.value)
        this.renderIcons()
    }

    private renderIcons() {
        for (const name of iconKeys) {
            const item = Z("div").class(style.item).children(getIcon(name))
            item.element.title = name
            item.element.onclick = () => this.select(name)
            this.items.set(name, item)
            this.grid.children(item)
        }
    }

    private filter(query: string) {
        const q = query.toLowerCase()
        this.items.forEach((item, name) => {
            item.element.style.display = name.toLowerCase().includes(q) ? "" : "none"
        })
    }

    private select(name: string) {
        if (this.value) {
            const prev = this.items.get(this.value)
            if (prev) prev.element.classList.remove(style.selected)
        }
        this.value = name
        const current = this.items.get(name)
        if (current) current.element.classList.add(style.selected)
        this.preview.HTML("").children(getIcon(name), Z("span").text(name))
    }

    getValue(): string {
        return this.value
    }

    setValue(value: string) {
        if (value) this.select(value)
        return this
    }
}
