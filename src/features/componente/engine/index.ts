import { IZeyo } from "zeyo/src/zeyo";
import CardAula from "../../../components/organisms/CardAula";
import ListaComTitulo from "../../../components/organisms/ListaComTitulo";
import App from "../../../app";

interface ComponentNode {
    type: string
    component: string,
    map: string,
    documents: { type: string, method: string, params: any[] }
    context?: string
}

export default class ComponenteEngine {
    static componentes: { [key: string]: (...params: any) => IZeyo<keyof HTMLElementTagNameMap> } = {
        ListaComTitulo,
        CardAula
    }

    static async execute(app: App, node: ComponentNode, context?: any) {
        const [documents] = await (app as any)[node.documents.type][node.documents.method](...this.makeParams(context || {}, node.documents.params))
        const [map] = await app.repository.findOne("AdaptadorMapeamento", { _id: node.map })
        return documents.map((document: any) => this.componentes[node.component](app).object(async (o: any) => {
            for (const key in map) {
                if (!o[key]) continue;
                const [type, documentKey] = map[key].split(":")

                if (type === "string") {
                    o[key](document[documentKey])
                    continue
                }

                if (type === "component") {
                    o.object(async () => {
                        const [component] = await app.repository.findOne("Componentes", { _id: documentKey })
                        o[key](...(await this.execute(app, component, node.context ? Object.assign({[node.context]: document}, context || {}) : context)))
                    })
                }
            }
        }))
    }

    static makeParams(context: any, params: any[]): any[] {
        return params.map(p => {
            if (Array.isArray(p)) return this.makeParams(context, params)
            if (typeof p === "object") {
                const newObj: any = {}
                for (const key in p)
                    newObj[key] = this.getFromContext(context, p[key])
                return newObj
            }

            return this.getFromContext(context, p)
        })
    }

    /**
* Recupera um valor de um objeto de contexto com base em uma string de caminho (dot notation).
* * @param context O objeto fonte de dados (ex: { module: { _id: "123" } })
* @param value A string que representa o caminho (ex: "$module._id") ou um valor literal.
* @returns O valor encontrado ou undefined se o caminho for inválido. Retorna o próprio value se não começar com "$".
*/
    static getFromContext(context: any, value: string): any {
        // 1. Se value não for string ou não começar com '$', retorna o valor literal
        if (typeof value !== 'string' || !value.startsWith('$')) {
            return value;
        }

        // 2. Remove o '$' inicial para ter apenas o caminho limpo (ex: "module._id")
        const cleanPath = value.substring(1);

        // 3. Se o caminho estiver vazio (ex: apenas "$"), retorna o contexto inteiro
        if (cleanPath === '') {
            return context;
        }

        // 4. Divide o caminho em chaves individuais
        const keys = cleanPath.split('.');

        // 5. Percorre o objeto de contexto
        let current = context;

        for (const key of keys) {
            // Proteção contra acesso a propriedades de null/undefined
            if (current === null || current === undefined) {
                return undefined;
            }

            // Tenta acessar a propriedade (funciona para objetos e arrays)
            current = current[key];
        }

        return current;
    }
}