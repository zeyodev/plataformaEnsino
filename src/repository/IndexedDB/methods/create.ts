import { Constructor } from "./_lib";
import { ulid } from "ulid";


export default function Create<Base extends Constructor>(base: Base) {
    return class extends base {
        async create(collection: string, value: any, origin?: string): Promise<[any, boolean]> {
            await this.waitDB("create")
            if (!origin && collection !== "_Logs") {
                value._id = ulid(new Date().getTime());
                await super.create(collection, value)
            }
            try {
                if (!this.idb.db.objectStoreNames.contains(collection)) {
                    const [result, err] = await this.idb.addStore(collection)
                    if (err) {
                        throw result
                    }
                }

                const store = this.idb.db.transaction(collection, "readwrite").objectStore(collection);
                //this.fireTrigger(collection, value, "create", origin)
                const request = store.put(value)
                await new Promise(res => {
                    request.onsuccess = () => res(true)
                    request.onerror = () => res(true)
                })
                return [value, false]
            } catch (error) {
                console.log("Create", collection, error);
                return [error, true]
            }
        }
    }
}