import { div, Div, Zeyo } from "zeyo";
import App from "../../../app";
import button from "../../atoms/button";
import Modal from "../../../states/Modal";
import modal from "../../molecules/modal";
import Form from "../../../form";
import adapter, { Adapter } from "./adapter";

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
    properMapping: Adapter
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
        return adapter(app, obj, properMapping).setReact(collection).click(async () => {
            app.context.setState(Modal("update", modal(app, actions.update(app, obj))))
            app.context.handle()
        })
    }
}).class("d-grid", "gap-g", "ac-start").object(o => o.children(
    o.button,
    o.list
))