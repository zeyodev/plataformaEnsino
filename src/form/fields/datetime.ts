import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import Input from "../atoms/inputs";

export default class FieldDateTime extends Field {
    __input: ZeyoAs<"input">
    constructor(key: string, toData?: boolean) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            this.__input = new Input().set("id", key).set("type", "datetime-local")
        )
    }

    getValue(): string {
        return this.__input.element.value
    }

    setValue(value: any) {
        const str: string = typeof value === "string" ? value: value.toISOString()
        const d = new Date(str)
        this.__input.element.value = `${d.toLocaleDateString().split("/").reverse().join("-")} ${d.toLocaleTimeString().replace(/[A-Z ]/g,"")}`;
        return this
    }
}