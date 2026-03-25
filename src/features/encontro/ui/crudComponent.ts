import { span, div } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import { CRUDComponent } from "../../../components/organisms/CRUD";

export default (app: App): CRUDComponent => (new class extends Card {
    propermap = {
        "titulo": (v: any) => this.titulo.text(v),
        "data": (v: any) => this.data.text(v || ""),
        "status": (v: any) => this.status.text(v || "agendado"),
        "meet_link": (v: any) => {
            if (v) {
                this.meetBtn.text("Entrar na Aula")
                this.meetBtn.set("href", v)
                this.meetBtn.element.style.display = "inline-block"
            } else {
                this.meetBtn.element.style.display = "none"
            }
        },
    }
    titulo = span()
    data = span()
    status = span()
    meetBtn = ((() => {
        const a = document.createElement("a")
        a.target = "_blank"
        a.rel = "noopener noreferrer"
        a.style.display = "none"
        a.style.padding = "0.25rem 0.75rem"
        a.style.borderRadius = "0.375rem"
        a.style.background = "var(--primary-500)"
        a.style.color = "#fff"
        a.style.fontSize = "0.8rem"
        a.style.fontWeight = "600"
        a.style.textDecoration = "none"
        a.textContent = "Entrar na Aula"
        return { text: (t: string) => { a.textContent = t }, set: (k: string, v: string) => { a.setAttribute(k, v); return { element: a } }, element: a }
    })())
}).object(o => {
    o.status.element.style.textTransform = "capitalize"
    o.status.element.style.fontSize = "0.8em"
    o.status.element.style.color = "var(--neutral-500)"
    o.data.element.style.fontSize = "0.85em"
    o.data.element.style.color = "var(--neutral-500)"
    o.element.appendChild(o.meetBtn.element)
    o.children(o.titulo, o.data, o.status)
}).class("d-flex", "gap-m", "ai-center") as CRUDComponent
