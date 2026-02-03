import Page, { PageConstructor } from "../pages"
import { ZeyoAppConstructor } from "./lib"

export default function Pages<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        pages?: Page[]
        setPages(...pages: PageConstructor[]) {
            this.pages = pages.map(p => new p(this))
            return this
        }
    }
}