import { FormElementContructorAny } from "../_lib"

export default function GetValueText<Base extends FormElementContructorAny>(base: Base) {
    return class extends base {
        getValue(): string | boolean {
            return this.element.element.innerText
        }
    }
}