import Route from "../router/_route"
import { ZeyoAppConstructor } from "./lib"

export default function Sleep<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        
        sleep(time = 1000): Promise<void> {
            return new Promise((resolve) => setTimeout(() => resolve(), time))
        }
    }
}