import { Div, Zeyo } from "zeyo";
import styles from "./styles.module.css"

export default () => (new class extends Div {
    showing = false
    show(component: Zeyo) {
        this.element.style.display = "inherit";
        this.HTML("")
        this.children(component)
        this.showing = true;
    }
    hide() {
        this.element.style.display = "none";
        this.showing = false;
    }
}).class(styles.modal, "zapcrm")