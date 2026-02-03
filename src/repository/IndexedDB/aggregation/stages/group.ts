import { Constructor } from "./lib";

export default function Group<Base extends Constructor>(base: Base) {
    return class extends base {
        async group(collection: string, params: any, action: (cursor: IDBCursor, value: any) => Promise<void>) {
            const groups: { [key: string]: any } = {}
            await this.cursor(collection, async (cursor, value, res, store) => {
                const group = value[params["_id"]]
                console.log(group)
                if (Object.prototype.hasOwnProperty.call(groups, group))
                    groups[group][Object.keys(params)[1]].push(value);
                else groups[group] = {
                    _id: group,
                    [Object.keys(params)[1]]: [value]
                }
                cursor.delete()
                cursor.continue()
            });

            console.log(groups)
            const store = this.transaction.objectStore(collection);
            store.clear()
            for (const group in groups) {
                store.put(groups[group]);
            }
        }
    }
}