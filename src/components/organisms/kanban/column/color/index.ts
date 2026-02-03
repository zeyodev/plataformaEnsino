import { Div } from "zeyo";
import styles from "./styles.module.css";

export default (colorIndex: number) => (new class extends Div {
    update(colorIndex: number) {
        this.element.style.borderColor = `var(--label-color-${colorIndex})`
    }
}).class(styles.color)
.object(o => o.element.style.borderColor = `var(--label-color-${colorIndex})`)