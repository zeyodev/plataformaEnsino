import App from "../app";
import Form from "../form/";
import { Zeyo, ZeyoAs } from "zeyo";
import Component from "../component";
import Bottom from "./bottom";
import style from "./modal.module.css";

interface Node {
    form: Form
    pre?: Node
}
export default class Modal {
    static element: Zeyo
    static modal: Component
    static node: Node
    static async show(app: App, form: Form){
        this.modal = new Bottom(app)
        app.hash.on = true
        app.hash.push("modal")
        this.node = {form}
        this.element = await this.modal.create(form)
        app.root.appendChild(this.element.element)

        app.hash.cb = () => {
            this.modal.main.element.remove()
        }
    }

    static async change(form: Form, node: Node){
        const novo = await this.modal.create(form)
        this.element.element.parentElement?.replaceChild(novo.element, this.element.element)
        this.element = novo
        this.node = node
    }

    static async push(form: Form){
        console.log(form)
        await this.change(form, {form, pre: this.node})
    }

    static async back(){
        if(this.node.pre)
            await this.change(this.node.pre.form, this.node.pre)
    }

    static setMessage(...child: Array<ZeyoAs<keyof HTMLElementTagNameMap> | string>){
        (this.element.childList[0] as Zeyo).HTML("").class(style["center"]).children(...child)
    }
}