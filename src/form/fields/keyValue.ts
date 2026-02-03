import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import Input from "../atoms/inputs";

export default class FieldKeyValue extends Field {
    __key: ZeyoAs<"input">
    __value: ZeyoAs<"input">
    constructor(key: string, toData?: boolean) {
        super(key, toData === true)
        this.class("d-flex", "gap-p").children(
            this.__key = new Input().set("id", `key-${key}`),
            this.__value = new Input().set("id", `value-${key}`)
        )
    }

    getValue(): string {
        return [this.__key.element.value, this.__value.element.value].join(":")
    }

    setValue(value: string) {
        [this.__key.element.value, this.__value.element.value] = value.split(":");
        return this
    }
}