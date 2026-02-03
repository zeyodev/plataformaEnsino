import { Zeyo } from "zeyo"
import etapas from "../etapas"
import App from "../../../app"
import ai from "../ai"
import lista from "../lista"
//import atendimentos from "../atendimentos"

export default class FactoryComponente {
    static list: { [key: string]: typeof FactoryComponente } = {
        etapas: FactoryComponente
    }

    componentes?: { [key: string]: (app: App, componente: any) => Zeyo } = {
        "etapas": etapas,
        "ai": ai,
        "lista": lista
        // aqui pode ter um editor de app. onde dapara editar desde o User flow => System design => Componentes/ Estados/ adapters/ ligacoes => Código Fonte
        //"atendimentos": atendimentos
    }

    make(app: App, componente: any) {
        if (!this.componentes || !this.componentes[componente.tipo])
            return null
        return this.componentes[componente.tipo](app, componente)
    }
}