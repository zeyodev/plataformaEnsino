import { Constructor } from "../_lib";

export default function Test<Base extends Constructor>(base: Base) {
    return class extends base {
        test(value: any, query: { [key: string]: any; }) {
            for (const key in query) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    switch (typeof query[key]) {
                        case "boolean":
                            if (value[key] !== query[key]) return false
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