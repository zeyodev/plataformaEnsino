import { Zeyo } from "zeyo";
import App from "../../../app";
import FormUpdateComponente from "../form/update";
import etapas from "../form/updates/etapas";

interface Componente {
    key: string;
    name: string;
    config: (app: App, etapa: any) => Zeyo;
}
export default class Componentes {
    static list: {[key: string]: Componente} = {
        "agenda": {key: "agenda", name: "Agenda", config: (app, etapa) => new FormUpdateComponente(app, etapa)},
        "etapas": {key: "etapas", name: "Etapas", config: etapas},
        "lista": {key: "lista", name: "Lista", config: (app, etapa) => new FormUpdateComponente(app, etapa)},
        "painel": {key: "painel", name: "Painel", config: (app, etapa) => new FormUpdateComponente(app, etapa)},
        "ai": {key: "ai", name: "IA", config: (app, etapa) => new FormUpdateComponente(app, etapa)},
        "atendimentos": {key: "atendimentos", name: "Atendimentos", config: (app, etapa) => new FormUpdateComponente(app, etapa)},
    }
}