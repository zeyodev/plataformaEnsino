import { Constructor } from "../_lib";

export default function Test<Base extends Constructor>(base: Base) {
    return class extends base {
        test(value: any, query: { [key: string]: any; }) {
            for (const key in query) {
                const hasKey = Object.prototype.hasOwnProperty.call(value, key)
                if (typeof query[key] === "object" && query[key] !== null) {
                    const operator = Object.keys(query[key])[0]
                    if (operator === "$exists") {
                        if (query[key]["$exists"] !== hasKey) return false
                        continue
                    }
                    if (!hasKey) return false
                    if (operator === "$in") {
                        if (!(Object.values(query[key])[0] as any[]).find(i => i === value[key])) return false
                    }
                } else {
                    if (!hasKey) return false
                    switch (typeof query[key]) {
                        case "boolean":
                            if (value[key] !== query[key]) return false
                        case "string":
                            if (value[key] !== query[key]) return false
                            break;
                    }
                }
            }
            return true
        }
    }
}