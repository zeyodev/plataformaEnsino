import Z, { Zeyo } from "zeyo"

import Action from "./properties/action"
import GetValue from "./properties/getValue"
import SetValue from "./properties/setValue"
import FormElement from "./_element"

export default class ObjectH extends Action(FormElement<"div">) {
    list: any[] = []
    constructor(label: string, list: any[], action?: any) {
        super("div", label, "")
        this.list = list
        if (action) this.action = action
    }
    create(): Zeyo {
        return this.zElement = this.element.children(
            ...this.createchildren()
        ).class("d-grid", "gap-p")
    }

    createchildren() {
        return [Z("label").text(this.label),
        Z("div").children(
            ...(this.list.map(i => typeof i === "string" ? Z("p").text(i) : Z("div").object(o => {
                if(i["setObject"]) i.setObject(o)
                else o.text(i.name || i.modelo)
            }).class(i.main ? "mainadapter" : "normaladapter").click(e => this.action(i))))
        ).class("object-list", "d-flex", "gap-m", "max-h-80", "of-auto")]
    }
    getValue() {
        return "object"
    }

    setValue(value: any) {
        this.element.attributes({ object: value })
    }
}