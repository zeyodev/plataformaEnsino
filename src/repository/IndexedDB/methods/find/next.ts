import Aggregation from "../../aggregation";
import Views from "../../views";
import { Constructor } from "../_lib";

export default function FindNext<Base extends Constructor>(base: Base) {
    return class extends base {
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
            /* if (this.isView(collection)) {
                const view = Views[collection]
                const value = await this.aggregation.makePipeline(view.base, view.stages, 0)
                return [value, count, false]
            } */
            return [{}, count, true]
        }
    }
}