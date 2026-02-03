import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import Input from "../atoms/inputs";

export default class FieldSelectSemana extends Field {
    __input: ZeyoAs<"select">
    constructor(key: string, toData?: boolean) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            this.__input = Z("select").class(Input.style)
        )
        this.options(
            {value: "0", name: "Domingo"},
            {value: "1", name: "Segunda"},
            {value: "2", name: "Terça"},
            {value: "3", name: "Quarta"},
            {value: "4", name: "Quinta"},
            {value: "5", name: "Sexta"},
            {value: "6", name: "Sábado"}
        )
    }

    options(...options: { value: string, name: string }[]) {
        this.__input.children(
            ...options.map(({ name, value }) => Z("option").set("value", value).text(name))
        )
        return this
    }

    getValue(): string {
        return this.__input.element.value
    }

    setValue(value: any) {
        this.__input.element.value = value
        return this
    }
}