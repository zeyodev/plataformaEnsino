import Z, { Zeyo } from "zeyo"

import Action from "./properties/action"
import GetValue from "./properties/getValue"
import SetValue from "./properties/setValue"
import FormElement from "./_element"
import style from "./objecthimg.module.css"

export default class ObjectHImg extends Action(FormElement<"div">) {
    list: any[] = []
    constructor(label: string, list: any[], action?: any) {
        super("div", label, "")
        this.list = list
        if (action) this.action = action
    }
    create(): Zeyo {
        return this.zElement = this.element.children(
            Z("label").text(this.label),
            Z("div").children(
                ...(this.list.map(i => {
                    const text = Z("label").text(i.name || i.modelo);
                    const classifmain = i.main ? "mainadapter" : "normaladapter"
                    return (i.img === "none" ?
                        Z("div").class(classifmain).children(text) :
                        Z("div").class(style.object, "d-grid", "gap-m", classifmain).children(
                            Z("img").set("src", i.img),
                            i.name || i.modelo ? text : ""
                        )
                    ).click(e => this.action(i))
                }))
            ).class("object-list", "d-flex", "gap-m", "max-h-80", "of-auto", "a-center")
        ).class("d-grid", "gap-p")
    }

    getValue() {
        return "object"
    }

    setValue(value: any) {
        this.element.attributes({ object: value })
    }
}