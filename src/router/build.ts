import App from "../app"
import Z from "zeyo"

export default class Build {
    app: App
    constructor(app: App){
        this.app = app
    }
    async build(path: string) {
        this.app.root.innerHTML = ""
        const params: { [key: string]: string } = {}
        console.log(this.app)
        const page = this.app.pages?.find(p => {
            if (p.route === path) return true
            else {
                const route = p.route.split("/")
                const pathname = path.split("/")
                if (route.length !== pathname.length) return false
                for (const i in route) {
                    if (route[i] !== pathname[i] && route[i][0] !== ":")
                        return false
                    else if (route[i][0] === ":") params[route[i].substring(1)] = pathname[i]
                }
                return true
            }
        })


        if (page)
            this.app.root.appendChild((await page!.create()).element)
        else this.app.root.appendChild((await {
            route: "/404",
            async create() {
                return Z("h1").object(e => {
                    e.element.innerText = "Pagina nao encontrada"
                })
            }
        }.create()).element)

    }
}