import Z from "zeyo"
import Option from ".."
import App from "../../app"
import CRUD from "../../components/organisms/CRUD"
import FormCreateCupom from "../../features/cupom/form/create"
import FormUpdateCupom from "../../features/cupom/form/update"
import cupomComponent from "../../features/cupom/ui/crudComponent"

export default class OptionAdminCupons extends Option {
    component: any

    constructor(private app: App) {
        super("admin-cupons", "Cupons", "iconTag", "admin-cupons")
        this.component = Z("div").class("d-grid", "gap-g", "ac-start").children(
            Z("h1").text("Cupons"),
            CRUD(this.app, "Cupons",
                { create: "Novo Cupom" },
                {
                    create: new FormCreateCupom(this.app),
                    update: (app: App, obj: any) => new FormUpdateCupom(app, obj),
                },
                cupomComponent,
            ),
        )
    }
}
