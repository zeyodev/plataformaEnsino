import Z, { Zeyo, ZeyoAs } from "zeyo"

export default class FormElement<T extends keyof HTMLElementTagNameMap>{
    label = ""
    placeholder = ""
    element: ZeyoAs<T>
    zElement: Zeyo = Z("div")
    type: string
    constructor(type: T, label: string, placeholder: string) {
        this.type = type
        this.label = label
        this.placeholder = placeholder
        this.element = Z(type)
    }
    object(cb: (f: this) => void){
        cb(this)
        return this
    }
}