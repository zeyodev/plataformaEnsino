import { h4, img } from "zeyo";
import App from "../../../app";
import Card from "../../atoms/card";
import style from "./style.module.css"
export default (app: App) => (new class extends Card {
    img = img()
    titulo = h4()
    aula: any
    setAula(aula: any) { this.aula = aula }
    setImg(value: string) { this.img.set("src", value) }
    setTitulo(value: string) { this.titulo.text(value) }
}).class("d-grid", "gap-m", style.aula).object(o => o.children(
    o.img,
    o.titulo
)).click((o) => app.context.action("assistir", o.aula))