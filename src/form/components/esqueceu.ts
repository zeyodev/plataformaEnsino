//import FormStore from "../../features/user/state/_store"
import Z, { Zeyo } from "zeyo"

import FormElement from "./_element"

export default class Esqueci extends FormElement<"p">{
    constructor(label: string, placeholder: string){
        super("p", label, placeholder)
    }
    create(): Zeyo {
        return this.zElement = this.element.class("pointer").object(z => {
            z.element.innerText = "Esqueci minha senha"
            z.element.style.textAlign = "right"
            z.element.onclick = e => {
                //FormStore.changeState("esqueci")
                console.log("aqui tem que mudar o state do form");
            }
        })
    }
}