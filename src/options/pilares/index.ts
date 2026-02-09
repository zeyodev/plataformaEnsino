import Z, { div, h1 } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import ListaComTitulo from "../../components/organisms/ListaComTitulo";
import CardAula from "../../components/organisms/CardAula";
import adaptador from "../../components/atoms/adaptador";
import { IZeyo } from "zeyo/src/zeyo";

export default class OptionPilares extends Option {
    constructor(private app: App) {
        super("pilares", "Pilares Fundamentais", "iconBarChart", "pilares")
    }

    gotError = false;

    component = Z("div").class("gap-g", "ac-start").children(
        h1(this.title),
        new Abas(this.app).object(async objectAbas => {
            const [pilares] = await this.app.repository.findMany("Pilares", {})
            for (const pilar of pilares) {
                objectAbas.push(new Aba(pilar.value, pilar.titulo, pilar.icon, div().object(async o => {
                    //const [component] = await this.app.repository.findOne("Componentes", { pilar: pilar._id })
                    const t = {
                        pilar: "ldf",
                        component: {
                            type: "adaptador",
                            component: "ListaComTitulo",
                            map: {
                                setTitulo: "titulo",
                                setLista: {
                                    type: "adaptador",
                                    component: "CardAula",
                                    map: {
                                        setImg: "capa",
                                        setTitulo: "titulo",
                                        onclick: ""
                                    },
                                    documents: { type: "repository", method: "findMany", params: ["Aulas", {}] },
                                    params: []
                                }
                            },
                            documents: { type: "repository", method: "findMany", params: ["Modulos", {}] },
                            params: []
                        }
                    }

                    interface ComponentNode {
                        type: string
                        component: string,
                        map: { [key: string]: any },
                        documents: { type: string, method: string, params: any[] }
                        params: any[]
                    }
                    const ComponentesMap: { [key: string]: (...params: any) => IZeyo<keyof HTMLElementTagNameMap> } = {
                        ListaComTitulo,
                        CardAula
                    }
                    async function execute(app: any, node: ComponentNode) {
                        const [documents] = await app[node.documents.type][node.documents.method](...node.documents.params)
                        console.log(documents)
                        return documents.map((document: any) => ComponentesMap[node.component](app).object((o: any) => {
                            for (const key in node.map) {
                                if (!o[key]) continue;
                                if (typeof node.map[key] === "string") {
                                    o[key](document[node.map[key]])
                                    continue
                                }

                                o.object(async () => o[key](...(await execute(app, node.map[key]))))
                            }
                        }))
                    }

                    o.children(...(await execute(this.app, t.component)))
                })))
            }
        })
            
            .push(new Aba("recepcao", "Recepção", "iconBell", div(
                "aqui tera um lista de varios videos"
            ), true))
            .push(new Aba("comercial", "Comercial", "iconMessageCircle", div(
                "aqui tera um lista de varios videos"
            )))
            .push(new Aba("financeiro", "Financeiro", "iconDollarSign", div(
                "aqui tera um lista de varios videos"
            )))
    );




}