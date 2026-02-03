import { Div, ZeyoAs } from "zeyo";
import App from "../../../../app";
import Aba from ".";

export default class FactoryAba extends Div {
    value = "Activity"
    titulo = "Atividade"
    client: any
    constructor(app: App, obj?: any) {
        super();
        this.client = obj
    }

    static list: {[key: string]: new (...params: any) => Aba} = {
        "default": Aba
    }
    /* static make(app: App, ambiente: Ambiente, option: Nicho): [Option, false] | [{}, true] {
        if(Object.prototype.hasOwnProperty.call(this.list, option.tipo))
            return [new this.list[option.tipo](app, ambiente, option), false];
        return [{}, true];
    } */
}