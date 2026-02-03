import State from "."
import Context from "./context"
import Z from "zeyo"
import Modal from "../component1.1/molecules/modal"

export default class StateModal extends State {
    children: { [key: string]: new () => State } = {}
    title = Z("h1")
    constructor(public name: string, private modal: ReturnType<typeof Modal>) {
        super()
    }

    handle(context: Context): void {
        context.app.root.appendChild(this.modal.element)
    }

    remove(): void {
        this.modal.remove()
    }

    commands = {}

    prerequisite(context: Context): boolean {
        return true
    }
}