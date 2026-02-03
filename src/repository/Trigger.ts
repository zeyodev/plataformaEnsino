import { cbAny, cbCollection } from ".";

export default class Trigger {

    deleteTrigger(collection: string, type: string, triggerid: string): void {
        delete this.listeners[collection][type][triggerid]
    }
    listeners: { [key: string]: { [key: string]: any } } = {
        "all": {}
    }
    createTriggerTo<T extends string | "all">(collection: T, cb: (T extends "all" ? cbAny : cbCollection), ...types: Array<"create" | "read" | "update" | "delete">): string {
        if (!Object.prototype.hasOwnProperty.call(this.listeners, collection))
            this.listeners[collection] = {}

        const triggerid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString()
        for (const type of types) {
            if (Object.prototype.hasOwnProperty.call(this.listeners[collection], type))
                this.listeners[collection][type][triggerid] = cb
            else this.listeners[collection][type] = { [triggerid]: cb }
        }
        return triggerid
    }

    fireTrigger(collection: string, value: any, type: string, origin?: string) {
        const has = Object.prototype.hasOwnProperty
        if (has.call(this.listeners["all"], type))
            for (const triggerid in this.listeners["all"][type]) {
                this.listeners["all"][type][triggerid](collection, value, type, triggerid, origin)
            }
        if (has.call(this.listeners, collection) && has.call(this.listeners[collection], type)) {
            for (const triggerid in this.listeners[collection][type]) {
                this.listeners[collection][type][triggerid](value, type, triggerid)
            }
        }
    }

}