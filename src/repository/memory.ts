import Repository from ".";
import Trigger from "./Trigger";
let data: { [key: string]: any[] } = {
    Pilares: [
        {
            value: "lideranca", 
            titulo: "Liderança", 
            icon: "iconUsers"}
    ],
    Modulos: [
        { titulo: "O Líder Consciente Autoconhecimento e Inteligência Emocional" }
    ],
    Aulas: [
        {
            "titulo": "A Jornada do Autoconhecimento",
            "capa": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
        },
        {
            "titulo": "Pilares da Inteligência Emocional",
            "capa": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
        },
        {
            "titulo": "Liderança e Empatia na Prática",
            "capa": "https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&w=1200&q=80"
        },
        {
            "titulo": "Gestão de Emoções sob Pressão",
            "capa": "https://images.unsplash.com/photo-1518072719234-a50369e601bb?auto=format&fit=crop&w=1200&q=80"
        },
        {
            "titulo": "Comunicação Consciente e Feedback",
            "capa": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
        },
        {
            "titulo": "Vulnerabilidade como Força Estratégica",
            "capa": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
        },
        {
            "titulo": "O Líder como Facilitador de Talentos",
            "capa": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
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