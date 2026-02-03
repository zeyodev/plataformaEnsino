import Push from "./push";

export default class Hash extends Push {
    static on = false
    static cb: () => void
    static remove() {
        if (this.on)
            window.history.back()
        this.cb()
    }
}