
import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import style from "./objecthimg.module.css"

export default class FieldObjectImg extends Field {
    list: ZeyoAs<"div">
    style = style
    constructor(key: string) {
        super(key)
        this.class("d-grid", "gap-p").children(
            this.list = Z("div").class("object-list", "d-flex", "gap-m", "max-h-80", "of-auto", "a-center")
        )
    }

    getValue(): string {
        // Not applicable for this field type
        return ""
    }

    setValue(value: any) {
        // Not applicable for this field type
        return this
    }
}