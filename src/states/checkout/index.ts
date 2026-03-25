import State from ".."
import Context from "../context"
import CheckoutPage from "../../pages/checkout"

export default class Checkout extends State {
    name = "checkout"
    children: { [key: string]: new () => State } = {}
    commands = {}

    handle(context: Context): void {
        context.app.root.innerHTML = ""
        const page = new CheckoutPage(context.app)
        context.app.root.appendChild(page.element)
    }

    prerequisite(): boolean {
        // Checkout é público, não requer autenticação
        return true
    }
}
