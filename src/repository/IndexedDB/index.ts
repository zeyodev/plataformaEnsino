
import Repository from "..";
import Aggregation from "./aggregation";
import IndexedDB from "./config";
import Method from "./methods";
import Create from "./methods/create";
import Find from "./methods/find";

export default class RepositoryIndexedDB extends Create(Find(Method)) implements Repository {
    methodsMap: { [key: string]: any } = {
        "create": this.create.bind(this),
        "update": this.updateAdapter.bind(this),
        "delete": this.delete.bind(this),
    }

    updateMany(collection: string, query: any, value: any): Promise<[any, boolean]> {
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
    type = "indexeddb"
    read(collection: string, query: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }

    updateAdapter(collection: string, payload: { id: string, value: any, _id?: string }, origin?: string): Promise<[any, boolean]> {
        if (payload._id)
            return this.update(collection, payload._id, payload, origin)

        return this.update(collection, payload.id, payload.value, origin)
    }

    async update(collection: string, id: string, value: any, origin?: string): Promise<[any, boolean]> {
        //this.fireTrigger(collection, { id, value }, "update", origin)
        if(collection !== "_Logs")
            await super.update(collection, id, value)
        console.log(id)
        const [update] = await this.findOne(collection, { _id: id })
        const store = this.idb.db.transaction(collection, "readwrite").objectStore(collection);
        Object.assign(update, value);
        console.log('update', update)
        store.put(update)
        console.log(await this.findOne(collection, { _id: id }))
        return [update, false]
    }
    updateQuery(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }

    /* 
        TODO: tenho que organizar esse repository em mixing para organizar melhor
     */

    findManySortLimit(collection: string, query: { [index: string]: any; }, limit: number, sort: 1 | -1): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }


    findUseCase(collection: string, args: any): Promise<[any, boolean]> {
        throw new Error(`Method not implemented. ${collection}`);
    }

    async delete(collection: string, id: string, origin?: string): Promise<[any, boolean]> {
        await this.waitDB("delete")
        //this.fireTrigger(collection, id, "delete", origin)
        await super.delete(collection, id)
        const store = this.idb.db.transaction(collection, "readwrite").objectStore(collection);
        store.delete(id);
        return [null, false]
    }
    deleteUsecase(collection: string, query: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    deleteMany(collection: string, query: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    deleteList(collection: string, id: string[]): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }

}