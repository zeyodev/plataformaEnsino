import Z, { Zeyo } from "zeyo"

import Action from "./properties/action"
import FormElement from "./_element"
import { ActionFunction } from "./_list"

export default class ObjectV extends Action(FormElement<"div">) {
    list: any[] = []
    constructor(list: any[], action?: ActionFunction, label?: string) {
        super("div", label ? label : "", "")
        this.list = list
        if (action) this.action = action
    }
    create(): Zeyo {
        return this.zElement = this.element.children(
            ...(this.list.map(i => Z("div").text(i.name || i.modelo).click(e => this.action(i))))
        ).class("object-list", "d-grid", "gap-m", "max-h-80", "of-auto")
    }

    getValue() {
        return "object"
    }

    setValue(value: any) {
        this.element.attributes({ object: value })
    }
}