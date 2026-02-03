import { Constructor } from "../_lib";
import Cursor from "./cursor";
import Test from "./test";

export default function Many<Base extends Constructor>(base: Base) {
    return class extends Test(Cursor(base)) {
        async findMany(collection: string, query: { [index: string]: any; }, transaction?: IDBTransaction): Promise<[any[], boolean]> {
            await this.waitDB("findMany")
            const result: any[] = []
            await this.cursor(collection, (cursor, value) => {
                if (this.test(value, query)) result.push(value)
                cursor.continue()
            }, transaction);
            return [result, false]
        }
    }
}