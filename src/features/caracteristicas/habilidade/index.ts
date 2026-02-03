import Z, { Div, ZeyoAs } from "zeyo";
import App from "../../../app";
import Caracteristica from "..";
import HabilidadeChat from "./chat";
export default class ComponenteCaracteristicaHabilidade extends Div {
    habilidadesMap: {[key: string]: new (...params: any[]) => ZeyoAs<"div">} = {
        //chat: HabilidadeChat
    };
    constructor(private app: App, caracteristica: Caracteristica, private item: any) {
        super();
        console.log(item)
        /* this.class("d-grid", "gap-g").children(
            Z("header").class("d-flex", "jc-between").children(
                Z("h2").text(caracteristica.titulo),
            )
        ).object(o => {
            if(Object.prototype.hasOwnProperty.call(this.habilidadesMap, caracteristica.alvo))
                o.children(new this.habilidadesMap[caracteristica.alvo](app, caracteristica, item))
        }) */
    }
}