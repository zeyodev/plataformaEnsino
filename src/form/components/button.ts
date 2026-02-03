import { Zeyo } from "zeyo"
import Action from "./properties/action"
import GetValue from "./properties/getValue"
import SetValue from "./properties/setValue"
import FormElement from "./_element"
import { ActionFunction } from "./_list"

export default class Button extends Action(SetValue(GetValue(FormElement<"button">))) {
    constructor(label: string, action?: ActionFunction) {
        super("button", label, "")
        if (action)
            this.action = action
    }
    create(): Zeyo {
        return this.zElement = this.element.click(() => {
            this.action([])
        }).attribute("type", this.type).text(this.label)
    }
}