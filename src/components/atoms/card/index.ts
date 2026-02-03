import { Div, ZeyoAs } from "zeyo";
import style from "./style.module.css";
import { BasicStyleTypes } from "../../StyleTypes";

export default class Card extends Div{
    constructor() {
        super()
        this.class(style.card)
    }
    style(type: keyof BasicStyleTypes): Card {
        return this.class(style[type]);
    }
}