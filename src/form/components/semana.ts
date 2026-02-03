import Z, { Zeyo, ZeyoAs } from "zeyo"
import Action from "./properties/action"
import FormElement from "./_element"
import { ActionFunction } from "./_list"

export default class Semana extends Action(FormElement<"div">) {
    list: { name: string, day: number, horarios: {inicio: string, fim: string}[] }[] = []
    botao: { action: ActionFunction, text: string }
    constructor(list: any[], botao: { action: ActionFunction, text: string }, action?: ActionFunction, label?: string) {
        super("div", label ? label : "", "")
        this.list = list
        this.botao = botao
        if (action) this.action = action
    }
    create(): Zeyo {
        return this.zElement = this.element.class("d-grid", "gap-p").children(
            Z("label").object(e => e.element.innerText = this.label),
            Z("div").class("d-flex", "jc-between").children(
                ...this.list.map(i => Z("div").class("pointer").children(
                    Z("h4").text(i.name),
                    ...i.horarios.map(h => Z("p").text(`${h.inicio} - ${h.fim}`))
                ).click(e => this.action(i)))
            ),
            Z("button").class("pointer", "aux").set("type", "button").click(() => this.botao.action()).text(this.botao.text),
        )
    }

    getValue() {
        return ""
    }

    setValue(value: Date) {
       
    }
}