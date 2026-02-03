import Z, { Zeyo, ZeyoAs } from "zeyo"
import GetValueText from "./properties/getValueText"
import SetValueText from "./properties/setValueText"
import FormElement from "./_element"
export default class Show extends SetValueText(GetValueText(FormElement<"p">)) {
    constructor(label: string) {
        super("p", label, "")
    }
    create(key: string): Zeyo {
        return this.zElement.class("d-grid", "gap-p").children(
            Z("label").text(this.label).attributes({ "for": key }),
            this.element.class("show"),
        )
    }
}