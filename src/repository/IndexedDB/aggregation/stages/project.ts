import { Constructor } from "./lib";

export default function Project<Base extends Constructor>(base: Base) {
    return class extends base {
        deepGet(value: any, keys: string[]): any {
            if (!value) return value
            if (keys.length)
                return this.deepGet(value[(keys.shift() as string)], keys)
            return value
        }
        async projectold(value: any, params: any) {
            for (const key in params) {
                const result = this.deepGet(value, (params[key] as string).split("."))
                value[key] = result ? result : "undefined"
            }
        }

        async project(collection: string, params: any, action: (cursor: IDBCursor, value: any) => Promise<void>) {
            await this.cursor(collection, async (cursor, value) => {
                const _id = value._id
                this.projectold(value, params)
                const store = this.transaction.objectStore(collection);
                store.put(value)
                if (_id !== value._id)
                    cursor.delete()
                cursor.continue()
            });
        }
    }
}