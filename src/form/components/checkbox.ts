//import Style from "../../style/style"
import Z, { Zeyo, ZeyoAs } from "zeyo"

import GetValue from "./properties/getValue"
import SetValue from "./properties/setValue"
import FormElement from "./_element"

export default class Checkbox extends SetValue(FormElement<"input">) {
    main: Zeyo = Z("div")
    list: any[] = []
    inputs: ZeyoAs<"input">[] = []
    /**
     * TEM QUE REFAZER ALGUNS DETALHES, PRINCIPALMENTE DA LISTA
     * @param label 
     * @param placeholder 
     * @param list 
     */
    constructor(label: string, placeholder: string, list: any[]) {
        super("input", label, placeholder)
        this.list = list
    }
    create(key: string): Zeyo {
        console.log(this)
        return this.main = this.zElement.class("d-grid", "gap-p", "cb-container").children(
            Z("label").text(this.label),
            Z("div").class("d-flex", "gap-m", "object-list").children(
                ...this.list.map((v, i) => {
                    this.inputs.push(Z("input").set("type", "checkbox").set("id", v.value).set("value", v.value))
                    return Z("label").attribute("for", v.value).class("d-flex", "gap-p", "checkbox").children(
                        this.inputs[i],
                        Z("span").text(v.name)
                    ).object(e => {
                        e.element.onclick = () => {
                            if ((e.element.childNodes[0] as HTMLInputElement).checked)
                                e.element.classList.add("checked")
                            else e.element.classList.remove("checked")
                        }
                    })
                })
            )
        )
    }

    getValue() {
        return this.inputs.map(e => e.element.checked)
    }

    /* TODO: tem que pensar numa forma melhor de usar o style junto com o codigo */
    /* style() {
        Style.create("cb-container", {
            padding: "10px 1em",
            gap: "1em",
            borderRadius: ".5em",
            border: "solid #351b8a"
        })
        Style.create("cb-container.checked", {
            backgroundColor: "#351b8a",
        })
        Style.create("checkbox", {
            position: "relative"
        })
        Style.create("checkbox input", {
            opacity: "0"
        })
        Style.create("checkmark:after", {
            content: `""`,
            position: "absolute",
            display: "none",
            top: "0",
            width: "50%",
            height: "60%",
            border: "solid white",
            borderWidth: "0 3px 3px 0",
            transform: "rotate(45deg)",
        })
        Style.create("cb-container.checked .checkmark:after", {
            display: "block"
        })
    } */
}