import { Div, img } from "zeyo";
import style from "./style.module.css";

export default class Logo extends Div {
    constructor() {
        super();
        this.class(style.logo).children(
            img().set("src", "/_img/logo.jpg").set("alt", "Duo Academy").class(style["logo-img"]),
        );
    }
}
