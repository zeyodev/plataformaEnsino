import Z, { Zeyo, ZeyoAs } from "zeyo"
import FormElement from "./_element"

export default class Time extends FormElement<"input"> {
    constructor(label: string, placeholder: string) {
        super("input", label, placeholder)
    }
    create(): Zeyo {
        this.element = Z("input").set("type", "time").attribute("placeholder", this.placeholder)
        return this.zElement.class("d-grid", "gap-p").children(
            Z("label").object(e => e.element.innerText = this.label),
            this.element,
        )
    }

    getValue() {
        return this.element.element.value
    }

    setValue(value: string) {
        this.element.element.value = value
    }
}