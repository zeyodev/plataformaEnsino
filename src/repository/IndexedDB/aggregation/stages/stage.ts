import RepositoryIndexedDB from "../..";
import IndexedDB from "../../config";

export default class Stage {
    repository: RepositoryIndexedDB
    transaction: IDBTransaction
    constructor(idb: IndexedDB, transaction: IDBTransaction) {
        this.transaction = transaction
        this.repository = new RepositoryIndexedDB(idb)
    }

    cursor(collection: string, action: (cursor: IDBCursor, value: any, res: (value: unknown) => void, store: IDBObjectStore) => void) {
        return new Promise(res => {
            const store = this.transaction.objectStore(collection);
            store.openCursor().onsuccess = async (event) => {
                const cursor: IDBCursor = (event as any).target.result;
                if (!cursor) return res({});
                action(cursor, cursor.request.result.value, res, store)
            };
        })
    }
}