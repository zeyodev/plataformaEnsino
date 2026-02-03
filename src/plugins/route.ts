import Route from "../router/_route"
import { ZeyoAppConstructor } from "./lib"

export default function Router<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        router: Route = ({} as Route)
        setRouter(router: Route) {
            this.router = router
            this.router.init()
            return this
        }
    }
}