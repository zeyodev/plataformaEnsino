//import Style from "../../style/style"
import Z, { ZeyoAs } from "zeyo"
import Field from "../field"
import style from "./style.module.css"

export default class FieldCheckboxSpan extends Field {
    setValue(value: any): void {
        throw new Error("Method not implemented.")
    }
    inputs: Array<ZeyoAs<"input">> = []
    body: ZeyoAs<"div">
    constructor(key: string, toData?: boolean) {
        super(key, toData === true)
        this.class("d-grid", "gap-m").children(
            this.body = Z("div").class("d-grid", "gap-p")
        )
    }

    clear() {
        this.body.HTML("")
        return this
    }

    push(...options: { value: string, span: ZeyoAs<"span"> }[]) {
        this.body.children(
            ...options.map((v, i) => {
                this.inputs.push(Z("input").set("type", "checkbox").set("id", v.value).set("value", v.value))
                return Z("label").attribute("for", v.value).class("d-flex", "gap-g", style.label).children(
                    this.inputs[i],
                    v.span
                ).object(e => {
                    e.element.onclick = () => {
                        if ((e.element.childNodes[0] as HTMLInputElement).checked)
                            e.element.classList.add("checked")
                        else e.element.classList.remove("checked")
                    }
                })
            })
        )
    }

    getValue(): string[] {
        return this.inputs.filter(v => v.element.checked).map(v => v.element.value)
    }
}