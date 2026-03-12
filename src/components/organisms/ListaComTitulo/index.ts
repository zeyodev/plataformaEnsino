import { Div, div, h3, span } from "zeyo";
import App from "../../../app";
import { IZeyo } from "zeyo/src/zeyo";
import listaHorizontal from "../../molecules/listaHorizontal";
import style from "./style.module.css";

export default (app: App) => (new class extends Div {
    header = div().class(style.header)
    titulo = h3()
    contador = span().class(style.contador)
    lista = listaHorizontal()
    private moduloId = ""

    setTitulo(value: string) { this.titulo.text(value) }

    setLista(...child: Array<IZeyo<keyof HTMLElementTagNameMap> | string>) {
        this.lista.HTML("").children(...child)
        if (this.moduloId) this.loadConclusoes()
        return this
    }

    setModulo(modulo: any) {
        if (modulo?._id) {
            this.moduloId = modulo._id
        }
    }

    private async loadConclusoes() {
        const [aulaLinks] = await app.repository.findMany("ModuloAulas", { modulo: this.moduloId })
        if (!aulaLinks || aulaLinks.length === 0) return

        let concluidas = 0
        for (const link of aulaLinks) {
            const [conclusao] = await app.repository.findOne("AulaConclusoes", { aulaId: link.aula })
            if (conclusao && conclusao.concluida) concluidas++
        }

        const total = aulaLinks.length
        this.contador.text(`${concluidas}/${total}`)
        if (concluidas === total && total > 0) {
            this.contador.class(style.contadorCompleto)
        }
    }
}).object(o => o.children(
    o.header.children(
        o.titulo,
        o.contador
    ),
    o.lista
)).class("d-grid", "gap-m")