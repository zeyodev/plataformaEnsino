import { Constructor } from "./lib";

export default function Unwind<Base extends Constructor>(base: Base) {
    return class extends base {
        async unwindold(value: any, params: any) {
            if (value[params.path])
                value[params.path] = value[params.path][0];
        }
        async unwind(collection: string, params: any, action: (cursor: IDBCursor, value: any) => Promise<void>) {
            await this.cursor(collection, async (cursor, value) => {
                this.unwindold(value, params)
                await action(cursor, value)
                cursor.continue()
            });
        }
    }
}