import Z, { div, h1, h3, p, span } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import ComponenteEngine from "../../features/componente/engine";
import Card from "../../components/atoms/card";

export default class OptionEncontros extends Option {
    constructor(private app: App) {
        super("encontros", "Encontros ao vivo", "iconVideo", "encontros")
    }

    gotError = false;

    private renderEncontroCard(encontro: any) {
        const card = new Card().class("d-flex", "gap-m", "ai-center", "jc-between")
        const info = div().class("d-grid", "gap-p")
        info.children(
            h3(encontro.titulo || "Encontro"),
            span(encontro.data || "").object(o => { o.element.style.fontSize = "0.85em"; o.element.style.color = "var(--neutral-500)" }),
            span(encontro.status || "agendado").object(o => { o.element.style.textTransform = "capitalize"; o.element.style.fontSize = "0.8em" }),
        )
        card.children(info)

        if (encontro.meet_link && encontro.status !== "encerrado") {
            const link = document.createElement("a")
            link.href = encontro.meet_link
            link.target = "_blank"
            link.rel = "noopener noreferrer"
            link.textContent = "Entrar na Aula"
            link.style.padding = "0.5rem 1rem"
            link.style.borderRadius = "0.375rem"
            link.style.background = "var(--primary-500)"
            link.style.color = "#fff"
            link.style.fontSize = "0.85rem"
            link.style.fontWeight = "600"
            link.style.textDecoration = "none"
            link.style.whiteSpace = "nowrap"
            card.element.appendChild(link)
        }

        return card
    }

    component = Z("div").class("gap-g", "ac-start").children(
        h1(this.title),
        new Abas(this.app).object(async objectAbas => {
            const [categorias] = await this.app.repository.findMany("CategoriasEncontros", {})
            for (const [i, categoria] of categorias.entries()) {
                objectAbas.push(new Aba(categoria.value, categoria.titulo, categoria.icon, div().class("d-grid", "gap-m").object(async o => {
                    const [component] = await this.app.repository.findOne("Componentes", { _id: "sdfwefsdfwe3" })
                    if (component) {
                        o.children(...(await ComponenteEngine.execute(this.app, component, { categoriasEncontros: categoria })))
                    }

                    // Listar encontros da categoria
                    const [encontros] = await this.app.repository.findMany("Encontros", { categoriaEncontro: categoria._id })
                    for (const encontro of encontros) {
                        o.children(this.renderEncontroCard(encontro))
                    }
                    if (encontros.length === 0 && !component) {
                        o.children(p("Nenhum encontro agendado."))
                    }
                }), i === 0))
            }
        })
    );
}