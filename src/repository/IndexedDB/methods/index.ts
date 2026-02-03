import { ClientRepository } from "../../sync";
import Trigger from "../../Trigger";
import IndexedDB from "../config";

export default class Method extends ClientRepository{
    idb: IndexedDB
    constructor(idb?: IndexedDB){
        super();
        this.idb = idb ? idb : new IndexedDB("metaorg")
    }

    setDatabase(dbname: string){
        this.idb = new IndexedDB(dbname);
    }

    sleep(time: number) {
        return new Promise(res => setTimeout(() => {
            res("")
        }, time))
    }

    async waitDB(from: string) {
        if (this.idb.db && !this.idb.addingIndex) return
        await this.sleep(300)
        console.log("esperando db", from, this.idb.request.error)
        await this.waitDB(from)
    }

    async checkIndexQuery(collection: string, query: { [index: string]: any; }): Promise<[string, any, boolean]> {
        await this.waitDB("checkIndexQuery")
        if (this.idb.addingIndex) {
            await this.sleep(300)
            return this.checkIndexQuery(collection, query)
        }
        const store = this.idb.db.transaction(collection, "readonly").objectStore(collection);
        const keys = Object.keys(query);
        const queryindex = keys.join("_");
        if (queryindex === "_id") return [queryindex, "", false]
        const [result, err] = await new Promise<[any, boolean]>(res => {
            const contains = store.indexNames.contains(queryindex)
            if (!contains)
                res(this.idb.addIndex(collection, keys, queryindex))
            res(["ok", false])
        });
        return [queryindex, result, err]
    }

    async checkEmptyStoreKeys(store: IDBObjectStore) {
        return !(await new Promise<any[]>(res => {
            store.getAllKeys().onsuccess = (event) => res((event as any).target.result)
        })).length
    }
}