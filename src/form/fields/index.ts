import Z, { Div, Zeyo, ZeyoAs } from "zeyo";
import Field from "./field";

export default class Fields extends Div {
    constructor(){
        super()
    }

    childList: Field[] = [];
    children(...child: Array<Field | Zeyo>): this {
        return super.children(...child)
    }
}