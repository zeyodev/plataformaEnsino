import { Constructor } from "../_lib";

export default function Cursor<Base extends Constructor>(base: Base) {
    return class extends base {
        async cursor(collection: string, action: (cursor: IDBCursor, value: any, res: (value: unknown) => void) => void, transaction?: IDBTransaction) {
            if(!this.idb.db.objectStoreNames.contains(collection)) return {};
            return new Promise(res => {
                const store = transaction ? transaction.objectStore(collection) : this.idb.db.transaction(collection).objectStore(collection);
                store.openCursor().onsuccess = async (event) => {
                    const cursor: IDBCursor = (event as any).target.result;
                    if (!cursor) return res({});
                    action(cursor, cursor.request.result.value, res)
                };
            })
        }
    }
}