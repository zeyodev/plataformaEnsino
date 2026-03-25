import Z, { div, h1, h3, span, p } from "zeyo";
import Option from ".";
import App from "../app";
import Abas from "../components/organisms/abas";
import Aba from "../components/organisms/abas/aba";
import ComponenteEngine from "../features/componente/engine";
import RoadmapDiagram from "../components/organisms/RoadmapDiagram";
import Card from "../components/atoms/card";

export function createOptionFromDB(app: App, produtoOption: any): Option {
    const tipo = produtoOption.tipo
    const config = produtoOption.config || {}

    switch (tipo) {
        case "pilares":
            return new OptionPilaresProduto(app, produtoOption, config.pilares || [])
        case "jornadas":
            return new OptionJornadasProduto(app, produtoOption, config.jornadas || [])
        case "encontros":
            return new OptionEncontrosProduto(app, produtoOption, config.encontros || [])
        default:
            return new OptionGenericoProduto(app, produtoOption)
    }
}

class OptionPilaresProduto extends Option {
    component: any

    constructor(private app: App, produtoOption: any, private pilarIds: string[]) {
        super(produtoOption._id, produtoOption.nome, produtoOption.icon, produtoOption._id)
        this.component = Z("div").class("gap-g", "ac-start").children(
            h1(produtoOption.nome),
            this.pilarIds.length > 0
                ? new Abas(this.app).object(async objectAbas => {
                    const [pilares] = await this.app.repository.findMany("Pilares", { _id: this.pilarIds })
                    for (const [i, pilar] of pilares.entries()) {
                        objectAbas.push(new Aba(pilar.value, pilar.titulo, pilar.icon, div().object(async o => {
                            const [component] = await this.app.repository.findOne("Componentes", { _id: "sdfwefsdfwe2" })
                            o.children(...(await ComponenteEngine.execute(this.app, component, { pilar })))
                        }), i === 0))
                    }
                })
                : div().children(Z("p").text("Nenhum pilar configurado para esta option."))
        )
    }
}

class OptionJornadasProduto extends Option {
    component: any

    constructor(private app: App, produtoOption: any, private jornadaIds: string[]) {
        super(produtoOption._id, produtoOption.nome, produtoOption.icon, produtoOption._id)
        this.component = Z("div").class("gap-g", "ac-start").children(
            h1(produtoOption.nome),
            this.jornadaIds.length > 0
                ? new Abas(this.app).object(async objectAbas => {
                    const [jornadas] = await this.app.repository.findMany("Jornadas", { _id: this.jornadaIds })
                    for (const [i, jornada] of jornadas.entries()) {
                        objectAbas.push(new Aba(jornada._id, jornada.titulo, jornada.icon, div().object(async o => {
                            const [fases] = await this.app.repository.findMany("Fases", { jornada: jornada._id })
                            const [etapas] = await this.app.repository.findMany("Etapas", {})
                            const [connections] = await this.app.repository.findMany("EtapaConnections", { jornada: jornada._id })

                            const jornadaEtapas = etapas.filter((e: any) =>
                                fases.some((f: any) => f._id === e.fase)
                            )

                            const diagram = new RoadmapDiagram(this.app)
                            diagram.setFases(fases, jornadaEtapas)
                            diagram.setConnections(connections)
                            o.children(diagram)
                        }), i === 0))
                    }
                })
                : div().children(Z("p").text("Nenhuma jornada configurada para esta option."))
        )
    }
}

class OptionEncontrosProduto extends Option {
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

    constructor(private app: App, produtoOption: any, private encontroIds: string[]) {
        super(produtoOption._id, produtoOption.nome, produtoOption.icon, produtoOption._id)
        this.component = Z("div").class("gap-g", "ac-start").children(
            h1(produtoOption.nome),
            this.encontroIds.length > 0
                ? new Abas(this.app).object(async objectAbas => {
                    const [categorias] = await this.app.repository.findMany("CategoriasEncontros", { _id: this.encontroIds })
                    for (const [i, categoria] of categorias.entries()) {
                        objectAbas.push(new Aba(categoria.value, categoria.titulo, categoria.icon, div().class("d-grid", "gap-m").object(async o => {
                            const [component] = await this.app.repository.findOne("Componentes", { _id: "sdfwefsdfwe3" })
                            if (component) {
                                o.children(...(await ComponenteEngine.execute(this.app, component, { categoriasEncontros: categoria })))
                            }

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
                : div().children(p("Nenhum encontro configurado para esta option."))
        )
    }
}

class OptionGenericoProduto extends Option {
    component: any

    constructor(private app: App, produtoOption: any) {
        super(produtoOption._id, produtoOption.nome, produtoOption.icon, produtoOption._id)
        this.component = Z("div").class("gap-g", "ac-start").children(
            h1(produtoOption.nome),
        )
    }
}
