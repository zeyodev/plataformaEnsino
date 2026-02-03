import { Div, Img, Span } from "zeyo";
import App from "../../../../app";
import Card from "../../../atoms/card";
export type Adapter = { [key: string]: "string" | "image" | "date" }
export default (app: App, obj: any, properMapping: Adapter) => (new class extends Card {
    properties: { [key: string]: any } = {}
    elements = {
        string: (prop: string) => (new class extends Span {
            update(updateProp: string) { this.text(updateProp) }
        }).text(prop),
        image: (prop: string) => (new class extends Img {
            update(updateProp: string) { this.set("src", updateProp) }
        }).set("src", prop),
        date: (prop: string) => (new class extends Span {
            update(updateProp: string) { 
                const date = new Date(updateProp)
                this.text(this.dateToString(date)) 
            }
            dateToString(date: Date) {
                return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
            }
            showDate() {
                const date = new Date(prop)
                this.text(this.dateToString(date))
                return this
            }
        }).showDate(),
    }

    make() {
        for (const key in properMapping) {
            const value = obj[key] || "loading..."
            this.properties[key] = this.elements[properMapping[key]](value).object(async o => {
                if (key.split(".").length <= 1) return
                const [info, fKey] = key.split(".")
                const [rKey, collection] = info.split("/")
                const [fObj] = await app.repository.findOne(collection, { _id: obj[rKey] })
                o.update(fObj[fKey])
            })
            this.children(this.properties[key])
        }
        return this;
    }

    setReact(collection: string) {
        app.repository.createTriggerTo(collection, (value, type) => {
            const id = type === "update" ? value.id : value; //quando é delete o value é o proprio _id
            if (id != obj._id) return
            if (type === "delete") return this.element.remove()
            //const object = type === "update" ? value.value : value;
            for (const key in value.value) {
                if (Object.prototype.hasOwnProperty.call(this.properties, key))
                    this.properties[key].update(value.value[key])
            }
        }, "update", "delete")
        return this;
    }
}).make().class("d-flex", "gap-m")