import Option from "..";
import App from "../../app";

export default class FactoryOption {
    static list: {[key: string]: new (...params: any) => Option} = {
        /* "etapas": OptionNichoEtapas,
        "lista": OptionNichoLista,
        "painel": OptionNichoPainel */
    }
    static make(app: App, ambiente: any, option: any): [Option, false] | [{}, true] {
        if(Object.prototype.hasOwnProperty.call(this.list, option.tipo))
            return [new this.list[option.tipo](app, ambiente, option), false];
        return [{}, true];
    }
}