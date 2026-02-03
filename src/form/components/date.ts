import Z, { Zeyo, ZeyoAs } from "zeyo"
import FormElement from "./_element"

export default class DateTime extends FormElement<"input"> {
    constructor(label: string, placeholder: string) {
        super("input", label, placeholder)
    }
    create(): Zeyo {
        this.element = Z("input").attribute("type", this.type).attribute("placeholder", this.placeholder)
        return this.zElement.class("d-grid", "gap-p").children(
            Z("label").object(e => e.element.innerText = this.label),
            this.element,
        )
    }

    getValue() {
        return new Date(this.element.element.value)
    }

    setValue(value: Date) {
        const str: string = typeof value === "string" ? value: value.toISOString()
        const d = new Date(str)
        this.element.element.value = `${d.toLocaleDateString().split("/").reverse().join("-")} ${d.toLocaleTimeString().replace(/[A-Z ]/g,"")}`
    }
}