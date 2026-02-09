import { Div, h3 } from "zeyo";
import App from "../../../app";
import { IZeyo } from "zeyo/src/zeyo";
import listaHorizontal from "../../molecules/listaHorizontal";

export default (app: App) => (new class extends Div {
    titulo = h3()
    lista = listaHorizontal()
    setTitulo(value: string) {this.titulo.text(value)}
    setLista(...child: Array<IZeyo<keyof HTMLElementTagNameMap> | string>) {
        this.lista.HTML("").children(...child)
        return this
    }
}).object(o => o.children(
    o.titulo,
    o.lista
)).class("d-grid", "gap-m")