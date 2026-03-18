import { div, Div, Zeyo } from "zeyo";
import App from "../../../app";
import button from "../../atoms/button";
import Modal from "../../../states/Modal";
import modal from "../../molecules/modal";

export type CRUDComponent = Zeyo & { propermap: { [key: string]: (value: any) => void } }

export default (app: App,
    collection: string,
    btnConfig: {
        create: string
    },
    actions: {
        create: Zeyo
        read?: any
        update: (app: App, obj: any) => Zeyo
    },
    component: (app: App) => CRUDComponent
) => (new class extends Div {
    button = button(btnConfig.create).set("type", "button").click(async () => {
        app.context.setState(Modal("create", modal(app, actions.create)))
        app.context.handle()
    })

    list = div().class("d-grid", "gap-m").object(async o => {
        app.repository.createTriggerTo(collection, (obj) => o.children(this.makeChild(obj)), "create")
        const [docs, err] = await app.repository.findMany(collection, actions.read ? actions.read : {})
        if (err) return
        docs.forEach(d => o.children(this.makeChild(d)))
    })

    makeChild(obj: any) {
        const child = component(app)
        for (const key in child.propermap) {
            if (obj[key] !== undefined) child.propermap[key](obj[key])
        }
        app.repository.createTriggerTo(collection, (value, type) => {
            const id = type === "update" ? value.id : value;
            if (id != obj._id) return
            if (type === "delete") return child.element.remove()
            for (const key in value.value) {
                if (Object.prototype.hasOwnProperty.call(child.propermap, key))
                    child.propermap[key](value.value[key])
            }
        }, "update", "delete")
        child.click(async () => {
            app.context.setState(Modal("update", modal(app, actions.update(app, obj))))
            app.context.handle()
        })
        return child
    }
}).class("d-grid", "gap-g", "ac-start").object(o => o.children(
    o.button,
    o.list
))