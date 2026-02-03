import App from "../../app";

export default abstract class Controller {
    app: App
    constructor(app: App){
        this.app = app
    }
    abstract execute(...args: any[]): void
}