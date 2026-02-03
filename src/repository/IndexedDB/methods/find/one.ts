import { Constructor } from "../_lib";
import Cursor from "./cursor";
import Test from "./test";

export default function One<Base extends Constructor>(base: Base) {
    return class extends Test(Cursor(base)) {
        async findOne(collection: string, query: { [index: string]: any; }): Promise<[any, boolean]> {
            await this.waitDB("findOne")
            const result = await this.cursor(collection, (cursor, value, res) => {
                if (this.test(value, query)) return res(value);
                cursor.continue();
            })
            return [result, false]
        }
    }
}