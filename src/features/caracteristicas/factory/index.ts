import Z, { Zeyo } from "zeyo";
import ComponenteCaracteristicaItem from "../item";
import App from "../../../app";
import Caracteristica from "..";
import ComponenteCaracteristicaNicho from "../nicho";
import ComponenteCaracteristicaHabilidade from "../habilidade";
import ComponenteCaracteristicaInverso from "../inverso";

export default class FactoryComponentesCaracteristicas {
    static list: {[key: string]: new (...args: any[]) => Zeyo} = {
        "item": ComponenteCaracteristicaItem,
        "nicho": ComponenteCaracteristicaNicho,
        "habilidade": ComponenteCaracteristicaHabilidade,
        "inverso": ComponenteCaracteristicaInverso
    }

    static make(app: App, caracteristica: Caracteristica, item: any): Zeyo {
        if(!Object.prototype.hasOwnProperty.call(this.list, caracteristica.tipo)) 
            return Z("div").children(Z("h2").text(caracteristica.titulo))
        return new FactoryComponentesCaracteristicas.list[caracteristica.tipo](app, caracteristica, item);
    }
}