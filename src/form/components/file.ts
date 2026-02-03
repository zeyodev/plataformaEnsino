import Z, { Zeyo, ZeyoAs } from "zeyo"
import FormElement from "./_element"

export type FileAction = (file: HTMLInputElement, element: HTMLInputElement) => void
export default class File extends FormElement<"input"> {
    file: ZeyoAs<"input"> = Z("input").set("type", "file");
    action: FileAction
    constructor(label: string, placeholder: string, action: FileAction) {
        super("input", label, placeholder)
        this.action = action
    }
    create(key: string): Zeyo {
        /* o element sera para mostrar o arquivo */

        this.element = Z("input").set("type", "text")
        return this.zElement.class("d-grid", "gap-p").children(
            Z("label").attribute("for", key).text(this.label),
            Z("div").class("d-grid", "gap-p").children(
                this.file.set("id", key),
                Z("button").set("type", "button").text("Enviar").click(() => {
                    console.log("enviando imagem para o servidor")
                    this.action(this.file.element, this.element.element)
                })
            ),
            this.element
        )
    }

    getValue() {
        return this.element.element.value
    }

    setValue(value: string) {
        this.element.element.value = value
    }
}