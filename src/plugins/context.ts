import Context from "../states/context";
import { ZeyoAppConstructor } from "./lib";

export default function ContextPlugin<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        context: Context = ({} as any)
        setContext(context: Context) {
            this.context = context;
            this.context.setState(context.getState())
            window.onpopstate = e => {
                e.preventDefault()
                if(window.location.hash) return
                if(context.app.hash.on) return context.app.hash.on = false;
                const state = this.context.getState()
                const previous = state.previousState
                if(!previous) return;
                this.context.backState();
                if(state.remove) state.remove()
                else this.context.render();
            }
            const pathname = window.location.pathname.substring(1).split('/')
            if (pathname.length === 1) this.context.handle()
            else {
                window.history.replaceState({ name: "root" }, "", "/")
                for (const key of pathname) {
                    if (key === "") continue;
                    const children = this.context.getState().children
                    if(!Object.prototype.hasOwnProperty.call(children, key)) break;
                    const next = new (children[key])()
                    if(!next.prerequisite(this.context)) break;
                    this.context.setState(next)
                }
                this.context.handle();
            }
            return this
        }
    }
}