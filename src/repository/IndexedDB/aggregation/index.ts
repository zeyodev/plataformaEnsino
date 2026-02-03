import IndexedDB from "../config";
import Views from "../views";
import Stages from "./stages";

export default class Aggregation {
    idb: IndexedDB
    stages: Stages
    constructor(idb: IndexedDB, transaction: IDBTransaction) {
        this.idb = idb
        this.stages = new Stages(idb, transaction)
    }

    //async makePipeline(collection: string, query: any, stages: any[], count: number): Promise<any> {
    async makePipeline(collection: string, stages: any[], count: number): Promise<any> {
        const [value, ncount, nerr] = await this.findNext(collection, count) /* quando a base for view tem lidar com ela aqui tbm */
        if (nerr) return value
        /* for (const stage of stages) {
            if (Object.prototype.hasOwnProperty.call(this.stages.list, stage.type))
                await this.stages.list[stage.type](value, stage.params)
        } */
        return value
    }

    async findNext(collection: string, count: number): Promise<[any, number, boolean]> {
        if (this.idb.db.objectStoreNames.contains(collection)) {
            return new Promise(res => {
                const store = this.idb.db.transaction(collection).objectStore(collection);
                let advanced = false
                store.openCursor().onsuccess = async (event) => {
                    const cursor: IDBCursor = (event as any).target.result;
                    if (!cursor) return res([null, count, true]);
                    if (advanced || count === 0) return res([cursor.request.result.value, count, false])
                    cursor.advance(count)
                    advanced = true
                };
            });
        }
        if (Object.prototype.hasOwnProperty.call(Views, collection)) {
            const view = Views[collection]
            const value = await this.makePipeline(view.base, view.stages, 0)
            return [value, count, false]
        }
        return [{}, count, true]
    }
}