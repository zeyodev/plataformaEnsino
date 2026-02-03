import App from "../app"
import Hash from "../router/hash/_hash"
import { Option, State, StateConstructor } from "./state"

export default class Navigation extends Hash {
    state: State
    constructor(state: State) {
        super()
        this.state = state
    }

    async next(option: Option, app: App) {
        const newState = new option.next(app)
        newState.previous = this.state
        this.state = newState
        const path = `${(option.next as any).path}/${option.param ? option.param.join('/') : ""}${option.param ? option.param.length ? "/" : "" : ""}`
        window.history.pushState({ name: this.state.name }, "", path)
        if (option.param)
            this.state.setParametros(option.param)
        await this.state.setup()
        await this.setPage(app)
    }

    back(frompop?: boolean) {
        if (!frompop) return window.history.back()
        if (this.state.previous && this.state.previous.name !== "root") {
            const aux = this.state
            this.state = this.state.previous
            this.state.forward = aux
        }
    }

    forward() {
        if (this.state.forward)
            this.state = this.state.forward
    }

    async push(state: State, app: App) {
        const aux = this.state
        this.state = state
        this.state.previous = aux
        await this.state.setup()
        await this.setPage(app)
        const param = Object.values(this.state.parametros)
        const pathname = `${this.state.name}/${param ? param.join('/') : ""}${param ? param.length ? "/" : "" : ""}`
        if (window.location.pathname === "/")
            window.history.replaceState({ name: this.state.name }, "", pathname)
        else
            window.history.pushState({ name: this.state.name }, "", pathname)
    }

    async read(path: string[], app: App) {
        console.log(this.state.name)
        if (!path.length) return true
        const key = path.shift()
        if (key === "" && !path.length) return
        if (!key || !this.state.childrens[key])
            return console.error(key, "não existe em:", this.state.name)
        const state = new this.state.childrens[key](app) 
        path = state.setParametros(path)
        await this.push(state, app)
        await this.read(path, app)
    }

    async setPage(app: App) {
        if (this.state.page) {
            const page = new this.state.page(app)
            app.root.innerHTML = ""
            if(page.create)
                app.root.appendChild((await page.create()).element);
            else app.root.appendChild(page.element)
        }
    }
}