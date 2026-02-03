import { Input as ZInput } from "zeyo";
import style from "./style.module.css"

export default class Input extends ZInput {
    static style = style.input;
    constructor() {
        super()
        this.class(style.input)
    }
}