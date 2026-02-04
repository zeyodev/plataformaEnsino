
import Z, { Zeyo } from "zeyo"
import FormElement from "./_element"
import Form from ".."

export default class ComponentForm {
    main: Zeyo = Z("form")
    properties: { [key: string]: FormElement<keyof HTMLElementTagNameMap> } = {}
    fields: any = {}
    async create(form: Form) {
        this.properties = {}
        /* this.fields = await form.getFields()
        console.log(this.fields) */
        return this.main /* = form.element = Z("form").class("d-grid", "gap-m", "ac-between").children(
            Z("div").class("d-grid", "gap-m","o-auto").children(
                Z("div").class("d-flex", "jc-between").children(
                    Z("h2").object(e => e.element.innerText = form.title),
                    form.delete ? Z("i").class("pointer").click(() => form.onDelete()).children(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="30px" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`): "",
                ),
                ...Object.keys(this.fields).map(k => {
                    //console.log(this.fields[k])
                    const z = this.fields[k].create(k)
                    this.fields[k].setValue(form.model[k])
                    this.fields[k].element.element.id = k
                    return z
                })
            ),
            Z("div").class("d-flex", "gap-m", "footer").children(
                ...((): Zeyo[] => {
                    const footer: Zeyo[] = []
                    if (form.footer.back !== "none")
                        footer.push(Z("button").text(form.footer.back).click(() => {
                            Modal.back()
                        }).class("aux").attribute("type", "button"))

                    if (form.footer.next !== "none")
                        footer.push(Z("button").text(form.footer.next))
                    return footer
                })()
            )
        ).object(z => z.element.onsubmit = e => {
            e.preventDefault()
            form.onSubmit(this.fields)
        }) */

    }
}