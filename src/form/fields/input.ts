import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import Input from "../atoms/inputs";

export default class FieldInput extends Field {
    __input: ZeyoAs<"input">
    constructor(key: string, toData?: boolean) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            this.__input = new Input().set("id", key)
        )
    }

    setType(type: string) {
        this.__input.set("type", type)
        return this
    }

    getValue(): string {
        return this.__input.element.value
    }

    setValue(value: string) {
        this.__input.element.value = value;
        return this
    }
}