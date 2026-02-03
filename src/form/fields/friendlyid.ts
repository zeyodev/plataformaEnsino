import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import App from "../../app";
import Form from "..";
import Input from "../atoms/inputs";

export default class FieldFriendlyId extends Field {
    __input: ZeyoAs<"input">
    constructor(key: string, toData: boolean, app: App, form: Form) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            this.__input = new Input().set("id", key).set("readOnly", true)
        )
        form.waitDone(() => {
            const field = form.getFieldByKey("titulo")
            console.log(field);
            field?.object((o) => {
                console.log(o);
                o.element.onchange = () => {
                    this.__input.element.value = o.getValue().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[" "]/g, "-")
                }
            })
        })
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