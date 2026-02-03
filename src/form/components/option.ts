import Z, { Zeyo } from "zeyo"

import FormElement from "./_element"

export default class Option extends FormElement<"div"> {
    options: {key: string; value: string}[] = []
    elements: Zeyo[] = []
    constructor(label: string, placeholder: string) {
        super("div", label, placeholder)
    }
    create(): Zeyo {
        return this.zElement.class("d-grid", "gap-p").children(
            Z("label").object(e => e.element.innerText = this.label),
            this.element,
        )
    }

    getValue() {
        return this.options.map((o, i) => {
            const e: any = this.elements[i].element
            o.value = e.value
            return o
        })
    }

    setValue(value: any[]) {
        this.options = value
        if(this.options)
        this.element.children(
            ...(this.options.map((o, i)=> {
                const input = Z("input").attribute("value", o.value)
                this.elements.push(input)
                return Z("div").children(
                    Z("label").text(o.key),
                    input
                ).class("d-grid", "gap-s")
            }))
        ).class("d-grid", "gap-m", "pl-1")
    }
}