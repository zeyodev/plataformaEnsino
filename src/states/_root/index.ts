import State from ".."
import Context from "../context"
import Usuario from "../usuario"
import Login from "../../pages/login"

export default class Root extends State {
    children = { "u": Usuario }
    name = "root"
    page = Login
    
    handle(context: Context): void {
        const page = new this.page(context.app)
        context.app.root.appendChild(page.element)
        if (!context.app.naoEstaAutenticado()){
        }
        this.login(context)
    }

    commands = { "login": this.login }
    private login(context: Context): void {
        context.setState(new Usuario())
        context.handle()
    }

    prerequisite(context: any): boolean {
        return true;
    }
}