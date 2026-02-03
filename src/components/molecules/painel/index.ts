import { Div, Main } from "zeyo";
import style from "./style.module.css"

export default class TemplatePainel extends Div {
    style = style;
    constructor() {
        super();
        this.class(style.layout)
    }
}