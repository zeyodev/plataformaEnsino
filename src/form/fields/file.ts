import Z, { ZeyoAs } from "zeyo";
import Field from "./field";

export default class FieldFile extends Field {
    file: ZeyoAs<"input"> = Z("input").set("type", "file")
    input: ZeyoAs<"input"> = Z("input").set("type", "text")
    constructor(key: string, toData?: boolean){
        super(key, true)
        this.class("d-grid", "gap-p").children(
            Z("div").class("d-grid", "gap-p").children(
                this.file.set("id", key),
                Z("button").set("type", "button").text("Enviar").click(() => {
                    console.log("enviando imagem para o servidor")
                    this.action(this.file, this)
                })
            ),
            this.input
        )
    }
    action = (file: ZeyoAs<"input">, element: FieldFile) => {}
    setAction(action: (file: ZeyoAs<"input">, element: FieldFile) => void): this {
        this.action = action;
        return this;
    }

    getValue(): string {
        return this.input.element.value;
    }
    setValue(value: string): this {
        this.input.element.value = value;
        return this;
    }
}