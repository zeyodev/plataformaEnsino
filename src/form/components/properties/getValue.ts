import { FormElementContructor } from "../_lib"

export default function GetValue<Base extends FormElementContructor>(base: Base) {
    return class extends base {
        getValue(): string | boolean {
            return this.element.element.value
        }
    }
}