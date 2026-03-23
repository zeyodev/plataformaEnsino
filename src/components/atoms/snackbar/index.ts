import { Div } from "zeyo";
import style from "./style.module.css";

type SnackbarType = "success" | "error";

class Snackbar extends Div {
    private timeout?: ReturnType<typeof setTimeout>;

    show(message: string, type: SnackbarType = "success", duration = 3000) {
        if (this.timeout) clearTimeout(this.timeout);

        this.element.className = style.snackbar;
        this.class(style[type], style.visible);
        this.text(message);

        this.timeout = setTimeout(() => {
            this.element.classList.remove(style.visible);
        }, duration);

        return this;
    }
}

const snackbar = new Snackbar();
snackbar.class(style.snackbar);
document.body.appendChild(snackbar.element);

export default snackbar;
