import { div, span, p } from "zeyo";
import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import Card from "../../../components/atoms/card";
import FormCreateAnotacao from "./formCreateAnotacao";
import FormCreateEvento from "./formCreateEvento";
import anotacaoComponent from "./anotacaoComponent";
import eventoComponent from "./eventoComponent";

const timeline = (app: App, usuarioId: string) =>
    div().class("d-grid", "gap-m").object(async (container) => {
        const [anotacoes] = await app.repository.findMany("Anotacoes", { usuario: usuarioId })
        const [eventos] = await app.repository.findMany("Eventos", { usuario: usuarioId })

        const items = [
            ...anotacoes.map((a: any) => ({ ...a, _tipo: "Anotação" })),
            ...eventos.map((e: any) => ({ ...e, _tipo: "Evento" })),
        ].sort((a, b) => {
            const da = a.data ? new Date(a.data).getTime() : 0
            const db = b.data ? new Date(b.data).getTime() : 0
            return db - da
        })

        if (items.length === 0) {
            container.children(p("Nenhuma atividade registrada."))
            return
        }

        for (const item of items) {
            const dataStr = item.data ? new Date(item.data).toLocaleDateString("pt-BR") : ""
            const descricao = item._tipo === "Anotação" ? (item.texto || "") : (item.descricao || "")
            const tipoEl = span(item._tipo)
            tipoEl.element.style.fontWeight = "600"
            tipoEl.element.style.minWidth = "70px"
            const descEl = span(descricao)
            descEl.element.style.flex = "1"
            const dataEl = span(dataStr)
            dataEl.element.style.color = "var(--neutral-500)"
            dataEl.element.style.fontSize = "0.85em"
            container.children(
                new Card().class("d-flex", "gap-m", "ai-center").children(tipoEl, descEl, dataEl)
            )
        }
    })

export default (app: App, obj: any) =>
    new Abas(app)
.push(new Aba("timeline", "Timeline", "iconClock", timeline(app, obj._id), true))
.push(new Aba("anotacoes", "Anotações", "iconEdit",
    CRUD(app, "Anotacoes", { create: "Nova Anotação" }, {
                create: new FormCreateAnotacao(app, obj._id),
                read: { usuario: obj._id },
                update: (a, o) => new FormCreateAnotacao(a, obj._id)
            }, anotacaoComponent),
        ))
        .push(new Aba("eventos", "Eventos", "iconCalendar",
            CRUD(app, "Eventos", { create: "Registrar Evento" }, {
                create: new FormCreateEvento(app, obj._id),
                read: { usuario: obj._id },
                update: (a, o) => new FormCreateEvento(a, obj._id)
            }, eventoComponent)
        ))
