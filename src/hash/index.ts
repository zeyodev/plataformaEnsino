import Push from "./push";

export default class Hash extends Push {
    on = false
    cb?: () => void
    remove() {
        if (this.on)
            window.history.back()
        if (this.cb)
            this.cb()
    }
}