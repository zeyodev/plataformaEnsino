import { Form as ZForm, div, h2, header } from "zeyo";
import Field from "./fields/field";
import Fields from "./fields";

export default abstract class Form extends ZForm {
    title = h2()
    header = header()
    body = div()
    footer = div()
    ready = true
    abstract onSubmit(): void
    /* fields: Fields */
    constructor() {
        super()
        this.class("d-grid", "gap-g", "ac-between").children(
            this.header.class("d-flex", "jc-between").children(
                this.title.text("Title"),
                //form.delete ? Z("i").class("pointer").click(() => form.onDelete()).children(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="30px" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`): "",
            ),
            this.body.class("d-grid", "gap-g", "o-auto").children(
            ),
            this.footer.class("d-flex", "gap-m", "footer")
        ).object(z => z.element.onsubmit = e => {
            e.preventDefault()
            this.onSubmit()
        })
    }

    getFieldsInObject() {
        const data: { [key: string]: Field } = {};
        (function deeploop(childList: any[]) {
            for (const c of childList) {
                if (!c.isField) {
                    deeploop(c.childList);
                    continue;
                }
                data[c.key] = c;
            }
        })(this.body.childList);
        return data
    }

    getDataFromFields(): {[key: string]: any} {
        const data: {[key: string]: string} = {}
        const object = this.getFieldsInObject()
        for (const key in object) {
            if(object[key].toData)
                data[key] = object[key].getValue()
        }
        return data
    }

    getField(key: string, childList: any[]): [any, true] | [Field, false] {
        for (const c of childList) {
            if (!c.isField) {
                const [f, e] = this.getField(key, c.childList);
                if (!e) return [f, e];
                continue;
            }
            if (c.key === key) return [c, false];
        }
        return [{}, true]
    }

    getFieldByKey(key: string){
        const [field, err] = this.getField(key, this.body.childList)
        if (err) return undefined
        return field
    }

    getValueByKey(key: string) {
        const [field, err] = this.getField(key, this.body.childList)
        if (err) return undefined
        return field.getValue()
    }

    submitTrigger?: (...args: any[]) => void
    setSubmitTrigger(cb?: (...args: any[]) => void){
        this.submitTrigger = cb
        return this;
    }

    triggerSubmit(...args: any[]) {
        if(this.submitTrigger) this.submitTrigger(...args)
    }

    watingDonelist:  Array<() => void> = []
    waitDone(cb : () => void) {
        this.watingDonelist.push(cb)
    }

    done() {
        for (const cb of this.watingDonelist){
            cb();
         }
    }
}