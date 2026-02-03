import Z, { Zeyo } from "zeyo"
import GetValue from "./properties/getValue"
import SetValue from "./properties/setValue"
import FormElement from "./_element"
import {FieldList} from "./_list"

export default class Password extends SetValue(GetValue(FormElement<"input">)) {
    extra: string[] = []
    constructor(label: string, placeholder: string) {
        super("input", label, placeholder)
    }
    create(): Zeyo {
        this.element.attribute("type", "password").attribute("placeholder", this.placeholder)
        return this.zElement.class("d-grid", "gap-p").children(
            Z("label").object(e => e.element.innerText = this.label),
            this.element,
            //TODO: tem que criar um campo extra para criar mais opcoes no campo
            ...this.extra.map(k =>{ return new FieldList.list[k]().create() })
        )
    }
}