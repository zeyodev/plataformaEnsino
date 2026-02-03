import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import Input from "../atoms/inputs";

export default class FieldTextarea extends Field {
    __input: ZeyoAs<"textarea">
    constructor(key: string, toData?: boolean) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            this.__input = Z("textarea").class(Input.style)
        )
    }

    getValue(): string {
        return this.__input.element.value
    }

    setValue(value: any) {
        this.__input.element.value = value
        return this
    }
}