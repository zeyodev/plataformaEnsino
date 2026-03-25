import Z from "zeyo"
import Option from ".."
import App from "../../app"
import CRUD from "../../components/organisms/CRUD"
import FormCreateCheckoutLink from "../../features/checkout-link/form/create"
import FormUpdateCheckoutLink from "../../features/checkout-link/form/update"
import checkoutLinkComponent from "../../features/checkout-link/ui/crudComponent"

export default class OptionAdminCheckout extends Option {
    component: any

    constructor(private app: App) {
        super("admin-checkout", "Checkout Links", "iconCart", "admin-checkout")
        this.component = Z("div").class("d-grid", "gap-g", "ac-start").children(
            Z("h1").text("Checkout Links"),
            CRUD(this.app, "CheckoutLinks",
                { create: "Novo Checkout" },
                {
                    create: new FormCreateCheckoutLink(this.app),
                    update: (app: App, obj: any) => new FormUpdateCheckoutLink(app, obj),
                },
                checkoutLinkComponent,
            ),
        )
    }
}
