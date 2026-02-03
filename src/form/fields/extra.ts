import { Zeyo } from "zeyo";
import Form from "..";
import Field from "./field";

export default (form: Form, target: string, extraFields: { [key: string]: Field | Zeyo }) => (new class extends Field {
    constructor() {
        super("extra")
    }
    getValue() { return "" }
    setValue(value: any): void { }
    subcb = () => { }
    setSub(cb: () => void) {
        this.subcb = cb
        return this
    }
    show(tipo: Field) {
        if (extraFields[tipo.getValue()]) {
            this.HTML("").children(extraFields[tipo.getValue()]).element.style.display = "grid"
            return this.subcb()
        }
        this.element.style.display = "none"
    }
}).object(extra => {
    extra.element.style.display = "none"
    const tipo = form.getFieldByKey(target)
    if (!tipo) return console.error(`Nem tem: ${target}`);
    tipo.on("change", tipo => extra.show(tipo))
    extra.show(tipo)
})