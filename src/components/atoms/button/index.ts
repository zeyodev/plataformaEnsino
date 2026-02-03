import { Button, i } from "zeyo";
import styles from "./styles.module.css"

export default (text?: string) => (new class extends Button {
    icon(icon: ReturnType<typeof i>) {
        const text = this.element.innerText;
        return this.HTML("").class(styles.icon).children(icon, text);
    }

    style(text: string): this {
        return this.class(styles[text]);
    }
}).class(styles.button).text(text || "")