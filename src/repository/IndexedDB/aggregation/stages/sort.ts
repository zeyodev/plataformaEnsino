import { Constructor } from "./lib";

export default function Lookup<Base extends Constructor>(base: Base) {
    return class extends base {
        async lookup(value: any, params: any) {
            const [result, err] = await this.repository.findMany(params.from, { [params.foreignField]: value[params.localField] })
            console.log(result, params)
            if (err) {
                value[params.as] = result
            } else
                value[params.as] = result
        }
    }
}