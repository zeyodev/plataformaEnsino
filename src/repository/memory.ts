import Repository from ".";
import Trigger from "./Trigger";
let data: { [key: string]: any[] } = {
    AdaptadorMapeamento: [
        {
            _id: "gfdodjfg",
            setTitulo: "string:titulo",
            setLista: "component:sdfwefsdfwe"
        },
        {
            _id: "aosdfjw2d",
            setImg: "string:capa",
            setTitulo: "string:titulo",
            //onclick: ""
        },
        {
            _id: "aosdfjw3d",
            setNome: "string:titulo",
            setValor: "expression:capa",
            //onclick: ""
        }
    ],
    Componentes: [
        {
            _id: "sdfwefsdfwe",
            type: "adaptador",
            component: "CardAula",
            map: "aosdfjw2d",
            documents: { type: "repository", method: "findManyToMany", params: ["ModuloAulas/aula:Aulas", { modulo: "$modulo._id" }] },

        },
        {
            _id: "sdfwefsdfwe2",
            type: "adaptador",
            component: "ListaComTitulo",
            map: "gfdodjfg",
            documents: { type: "repository", method: "findMany", params: ["Modulos", { pilar: "$pilar._id" }] },
            context: "modulo",
        }
    ],
    Pilares: [
        {
            _id: "lskdjfo1",
            value: "lideranca",
            titulo: "Liderança",
            icon: "iconUsers"
        },
        {
            _id: "lskdjfo2",
            value: "recepcao",
            titulo: "Recepção",
            icon: "iconBell"
        },
        {
            _id: "lskdjfo3",
            value: "comercial",
            titulo: "Comercial",
            icon: "iconMessageCircle"
        },
        {
            _id: "lskdjfo4",
            value: "financeiro",
            titulo: "Financeiro",
            icon: "iconDollarSign"
        }
    ],
    Modulos: [
        { _id: "lskjfof1", pilar: "lskdjfo1", titulo: "O Líder Consciente Autoconhecimento e Inteligência Emocional" },
        { _id: "lskjfof2", pilar: "lskdjfo2", titulo: "Comunicação de Impacto e Cultura de Confiança" },
        { _id: "lskjfof3", pilar: "lskdjfo3", titulo: "Gestão de Equipes de Alta Performance e Delegação" },
        { _id: "lskjfof4", pilar: "lskdjfo4", titulo: "Liderança Estratégica e Gestão de Mudanças" },
        { _id: "lskjfof5", pilar: "lskdjfo1", titulo: "Liderança Estratégica e Gestão de Mudanças" },
    ],
    ModuloAulas: [
        { aula: "clskdjffksd0", modulo: "lskjfof2" },
        { aula: "clskdjffksd1", modulo: "lskjfof2" },
        { aula: "clskdjffksd2", modulo: "lskjfof1" },
        { aula: "clskdjffksd3", modulo: "lskjfof1" },
        { aula: "clskdjffksd4", modulo: "lskjfof1" },
        { aula: "clskdjffksd5", modulo: "lskjfof3" },
        { aula: "clskdjffksd6", modulo: "lskjfof4" },
        { aula: "clskdjffksd6", modulo: "lskjfof5" },
        { aula: "clskdjffksd3", modulo: "lskjfof5" },
        { aula: "clskdjffksd5", modulo: "lskjfof5" },
    ],
    Aulas: [
        {
            _id: "clskdjffksd0",
            "titulo": "A Jornada do Autoconhecimento",
            "capa": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
        },
        {
            _id: "clskdjffksd1",
            "titulo": "Pilares da Inteligência Emocional",
            "capa": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"
        },
        {
            _id: "clskdjffksd2",
            "titulo": "Liderança e Empatia na Prática",
            "capa": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80"
        },
        {
            _id: "clskdjffksd3",
            "titulo": "Gestão de Emoções sob Pressão",
            "capa": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        },
        {
            _id: "clskdjffksd4",
            "titulo": "Comunicação Consciente e Feedback",
            "capa": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
        },
        {
            _id: "clskdjffksd5",
            "titulo": "Vulnerabilidade como Força Estratégica",
            "capa": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
        },
        {
            _id: "clskdjffksd6",
            "titulo": "O Líder como Facilitador de Talentos",
            "capa": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
        }
    ],
    Mostradores: [
        {
            _id: "123",
            titulo: "Mes",
            valor: 0
        }
    ]
};


export default class RepositoryMemory extends Trigger implements Repository {
    methodsMap: { [key: string]: any } = {
        "create": this.create.bind(this),
        "update": this.updateAdapter.bind(this),
        "delete": this.delete.bind(this),
    }

    async create(collection: string, value: any, origin?: string): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            data[collection] = []

        value._id = crypto.randomUUID();
        data[collection].push(value)
        this.fireTrigger(collection, value, "create", origin)
        return [value, false]
    }

    updateAdapter(collection: string, payload: { id: string, value: any }, origin?: string): Promise<[any, boolean]> {
        return this.update(collection, payload.id, payload.value, origin)
    }

    async update(collection: string, id: string, value: any, origin?: string): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return [["colecao invalida"], true]

        data[collection].forEach(e => {
            if (e._id === id) Object.assign(e, value)
        })

        this.fireTrigger(collection, { id, value }, "update", origin)
        return [id, false]
    }
    updateQuery(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    updateMany(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    async delete(collection: string, id: string, origin?: string): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return [["colecao invalida"], true]

        const index = data[collection].findIndex(i => i._id === id)
        if (index < 0) return [{ deleteCount: 0 }, false]
        data[collection].splice(index, 1)
        this.fireTrigger(collection, id, "delete", origin)
        return [id, false]
    }
    deleteMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }

    findManySortLimit(collection: string, query: { [index: string]: any; }, limit: number, sort: 1 | -1): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }

    async findMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return [["colecao invalida"], true]

        const list: any[] = []
        for (const item of data[collection]) {
            if (this.check(item, query)) list.push(item)
        }
        return [list, false]
    }

    async findManyToMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        const [mainCollection, keyCollection] = collection.split("/")
        const [key, targetCollection] = keyCollection.split(":")
        if (!Object.prototype.hasOwnProperty.call(data, mainCollection))
            return [["colecao invalida"], true]

        const list: any[] = []
        for (const item of data[mainCollection]) {
            if (this.check(item, query)) {
                const [full] = await this.findOne(targetCollection, { _id: item[key] })
                Object.assign(item, full)
                list.push(item)
            }
        }
        return [list, false]
    }

    async findOne(collection: string, query: { [index: string]: any; }): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return ["colecao invalida", true]
        for (const item of data[collection]) {
            if (this.check(item, query)) return [item, false]
        }
        return ["nao encontrado", true]
    }

    check(item: any, query: any) {
        for (const key in query) {
            if (item[key] !== query[key]) return false
        }
        return true
    }
    read(collection: string, query: any): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    readMany(collection: string, id: string): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    readMore(collection: string, query: any): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    usecase<T>(name: string, data?: any): Promise<[T, boolean]> {
        throw new Error("Method not implemented.");
    }
}