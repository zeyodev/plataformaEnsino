import Z, { div, h1, h3, span, p } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import Card from "../../components/atoms/card";
import ListaComTitulo from "../../components/organisms/ListaComTitulo";
import CardAula from "../../components/organisms/CardAula";

export default class OptionEncontrosProduto extends Option {
    component: any

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

    constructor(private app: App, produtoOption: any) {
        super(produtoOption._id, produtoOption.nome, produtoOption.icon, produtoOption._id)
        this.component = Z("div").class("gap-g", "ac-start").children(
            h1(produtoOption.nome),
            new Abas(this.app).object(async objectAbas => {
                const [vinculadas] = await this.app.repository.findMany("ProdutoOptionEncontros", { produtoOption: produtoOption._id })
                const categoriaIds = vinculadas.map((v: any) => v.categoriaEncontro)
                if (categoriaIds.length === 0) {
                    objectAbas.element.replaceWith(div().children(p("Nenhum encontro configurado para esta option.")).element)
                    return
                }
                const [categorias] = await this.app.repository.findMany("CategoriasEncontros", { _id: categoriaIds })
                for (const [i, categoria] of categorias.entries()) {
                    objectAbas.push(new Aba(categoria.value, categoria.titulo, categoria.icon, div().class("d-grid", "gap-m").object(async o => {
                        const [modulos] = await this.app.repository.findMany("Modulos", { categoriasEncontros: categoria._id })
                        for (const modulo of modulos) {
                            const [aulaLinks] = await this.app.repository.findMany("ModuloAulas", { modulo: modulo._id })
                            const aulaIds = aulaLinks.map((l: any) => l.aula)
                            const [aulas] = await this.app.repository.findMany("Aulas", { _id: aulaIds })
                            o.children(
                                ListaComTitulo(this.app).object(lista => {
                                    lista.setModulo(modulo)
                                    lista.setTitulo(modulo.titulo)
                                    lista.setLista(...aulas.map((aula: any) =>
                                        CardAula(this.app).object(card => {
                                            card.setImg(aula.thumbnail)
                                            card.setTitulo(aula.title)
                                            card.setAula(aula)
                                        })
                                    ))
                                })
                            )
                        }

                        const [encontros] = await this.app.repository.findMany("Encontros", { categoriaEncontro: categoria._id })
                        for (const encontro of encontros) {
                            o.children(this.renderEncontroCard(encontro))
                        }
                        if (modulos.length === 0 && encontros.length === 0) {
                            o.children(p("Nenhum encontro agendado."))
                        }
                    }), i === 0))
                }
            })
        )
    }
}
