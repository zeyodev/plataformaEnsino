import Z, { Zeyo } from "zeyo"
import GetValue from "./properties/getValue"
import SetValue from "./properties/setValue"
import FormElement from "./_element"

export default class Input extends SetValue(GetValue(FormElement<"input">)) {
    constructor(label: string, placeholder: string) {
        super("input", label, placeholder)
    }
    create(key: string): Zeyo {
        return this.zElement.class("d-grid", "gap-p").children(
            Z("label").text(this.label).attributes({"for": key}),
            this.element.attributes({
                "id": key,
                "type": this.type
            }).attribute("placeholder", this.placeholder),
        )
    }
}