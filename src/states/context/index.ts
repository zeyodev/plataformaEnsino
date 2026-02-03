import State from "..";
import App from "../../app";
import Organizacao from "../../core/entity/Organizacao";

export default class Context {
    substate?: any;
    entrouOrganizacao = false
    organizacao?: Organizacao
    constructor(public app: App, private state: State) {
        console.log("\n\n\n setando connect do socket")
    }

    seted = false
    setOnconnect() {
        if(this.seted) return
        this.seted = true
        this.app.socket.on("connect", async () => {
            console.log(this.state)
            if (this.entrouOrganizacao) {
                const event = `entrarorganizacao/${this.app.msgId()}`
                this.app.socket.emit(event, { organizacao: this.organizacao })
                await this.app.socket.wait(event, 3000)
                console.log("[Sync] Conexão restabelecida. Iniciando recuperação...");
                this.app.synchronizer.initiateRecovery();
            }
        })
    }

    setState(state: State) {
        state.previousState = this.state;
        this.state = state;
        return this
    }

    backState() {
        if (!this.state.previousState) return
        this.state.previousState.nextState = this.state;
        this.state = this.state.previousState;
    }

    getState() {
        return this.state;
    }

    forward() {
        this.state.handle(this)
    }

    back(pop: boolean = true): void {
        this.state.handle(this)
    }

    handle() {
        const path = this.state.name
        if (path !== "root")
            window.history.pushState({ name: path }, "", `${window.location.pathname}${path}/`)
        this.state.handle(this)
    }

    render() {
        this.app.root.innerHTML = ""
        this.state.handle(this)
    }

    action(cmd: string, ...params: any[]) {
        this.state.action(cmd, this, ...params)
    }

    read(pathname: string[]) {
        console.log("read", pathname);
    }
}