import { dialog, Div, ZeyoAs } from "zeyo";
import style from "./style.module.css";
import { BasicStyleTypes } from "../../StyleTypes";
import Card from "../../atoms/card";
import App from "../../../app";
interface styleTypes extends BasicStyleTypes {
    "primary": string
    "botton": string
}
export default (app: App, ...child: Array<ZeyoAs<keyof HTMLElementTagNameMap> | string>) => (new class extends Div {
    modal = (new class extends Card {}).class(style.modal);

    remove() { this.element.remove() }

    style(type: keyof styleTypes) {
        this.modal.class(style[type]);
        return this;
    }
}).class(style.container).object(o => o.children(
    o.modal.children(...child),
)).click((o, e) => {
    if (e.target === o.element)
        window.history.back();
})