import { Constructor } from "./lib";

export default function Lookup<Base extends Constructor>(base: Base) {
    return class extends base {
        async lookupold(value: any, params: any) {
            const collection = params.from
            const query = { [params.foreignField]: value[params.localField] }
            const result: any[] = [];
            await this.cursor(collection, (cursor, value) => {
                if (this.test(value, query)) result.push(value)
                cursor.continue()
            });
            value[params.as] = result;
        }
        async lookup(collection: string, params: any, action: (cursor: IDBCursor, value: any) => Promise<void>) {
            await this.cursor(collection, async (cursor, value) => {
                await this.lookupold(value, params)
                await action(cursor, value)
                cursor.continue()
            });
        }

        test(value: any, query: { [key: string]: any; }) {
            for (const key in query) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    switch (typeof query[key]) {
                        case "string":
                            if (value[key] !== query[key]) return false
                            break;
                        case "object":
                            if (Object.keys(query[key])[0] === "$in") {
                                if (!(Object.values(query[key])[0] as any[]).find(i => i === value[key])) return false
                            }
                            break;
                    }
                } else return false
            }
            return true
        }
    }
}