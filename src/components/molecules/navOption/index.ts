import Z, { A, div, ZeyoAs } from "zeyo";
import App from "../../../app";
import style from "./style.module.css";
import Option from "../../../options";
import iconCheck from "lucideIcons/iconCheck";
import icons from "../../atoms/icons";

export default class NavOption extends A {
    icon = iconCheck();
    span = Z("span");
    edit = false
    constructor(private app: App, public option: Option, cb: (option: NavOption) => void) {
        super();
        this.class(style["nav-option"], "d-flex", "gap-m").children(
            this.icon = typeof option.icon === "string" ? icons((option.icon as any)) : option.icon,
            div(
                this.span.text(option.title || (option as any).nome),
            ).class("d-flex", "w-100", "jc-between"),
        ).click(() => {
            cb(this)
        })
    }

    selected() {
        this.class(style["selected"]);
    }

    deselected() {
        this.element.classList.remove(style["selected"]);
    }

    toggle() {
        this.element.classList.toggle(style["selected"]);
    }
}