import { h4, img } from "zeyo";
import App from "../../../app";
import Card from "../../atoms/card";
import style from "./style.module.css"
export default (app: App) => (new class extends Card {
    img = img()
    titulo = h4()
    setImg(value: string) {this.img.set("src", value)}
    setTitulo(value: string) {this.titulo.text(value)}
}).class("d-grid", "gap-m", style.aula).object(o => o.children(
    o.img,
    o.titulo
))/* .click(() => app.context.setState()) */