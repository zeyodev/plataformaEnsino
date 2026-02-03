import { FormElementContructorAny } from "../_lib"

export default function SetValueText<Base extends FormElementContructorAny>(base: Base) {
    return class extends base {
        setValue(value: any) {
            if(typeof value === "undefined") return
            this.element.element.innerText = value
        }
    }
}