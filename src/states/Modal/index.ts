import State from "..";
import modal from "../../component1.1/molecules/modal";
import Context from "../context";

export default (name: string, zmodal: ReturnType<typeof modal>) => (new class extends State {
    name = name;
    children: { [key: string]: new () => State; } = {};
    
    handle(context: Context): void {
        context.app.root.appendChild(zmodal.element)
    }

    remove(): void {
        zmodal.remove()
    }

    commands = {}

    prerequisite(context: Context): boolean {
        return true
    }
})