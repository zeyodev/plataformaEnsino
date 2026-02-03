import { FormElementContructor } from "../_lib"

export default function SetValue<Base extends FormElementContructor>(base: Base) {
    return class extends base {
        setValue(value: any) {
            if(typeof value === "undefined") return
            this.element.element.value = value
        }
    }
}