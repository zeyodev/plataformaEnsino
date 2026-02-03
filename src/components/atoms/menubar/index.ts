import Z, { Div } from "zeyo";
import style from "./style.module.css"
export default () => (new class MenuBar extends Div {
    toggle() {
        this.element.classList.toggle(style.change);
    }
}).class(style.container).children(
    Z("div").class(style.bar1),
    Z("div").class(style.bar2),
    Z("div").class(style.bar3),
)