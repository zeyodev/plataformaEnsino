import { Div, h3 } from "zeyo";
import App from "../../../app";
import { IZeyo } from "zeyo/src/zeyo";
import listaHorizontal from "../../molecules/listaHorizontal";

export default (app: App, titulo: string, ...child: Array<IZeyo<keyof HTMLElementTagNameMap> | string>) => (new class extends Div {}).children(
    h3(titulo),
    listaHorizontal(...child)
).class("d-grid", "gap-m")