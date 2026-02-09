import { Div } from "zeyo";
import { IZeyo } from "zeyo/src/zeyo";

export default (...child: Array<IZeyo<keyof HTMLElementTagNameMap> | string>) => (new class extends Div {}).class("d-flex", "gap-g", "o-auto").children(...child)