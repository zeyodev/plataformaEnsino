import Z, { div, h1 } from "zeyo";
import Option from ".";
import App from "../app";
import Abas from "../components/organisms/abas";
import Aba from "../components/organisms/abas/aba";
import ComponenteEngine from "../features/componente/engine";
import RoadmapDiagram from "../components/organisms/RoadmapDiagram";

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

    constructor(private app: App, produtoOption: any, private encontroIds: string[]) {
        super(produtoOption._id, produtoOption.nome, produtoOption.icon, produtoOption._id)
        this.component = Z("div").class("gap-g", "ac-start").children(
            h1(produtoOption.nome),
            this.encontroIds.length > 0
                ? new Abas(this.app).object(async objectAbas => {
                    const [encontros] = await this.app.repository.findMany("CategoriasEncontros", { _id: this.encontroIds })
                    for (const [i, categoriasEncontros] of encontros.entries()) {
                        objectAbas.push(new Aba(categoriasEncontros.value, categoriasEncontros.titulo, categoriasEncontros.icon, div().object(async o => {
                            const [component] = await this.app.repository.findOne("Componentes", { _id: "sdfwefsdfwe3" })
                            o.children(...(await ComponenteEngine.execute(this.app, component, { categoriasEncontros })))
                        }), i === 0))
                    }
                })
                : div().children(Z("p").text("Nenhum encontro configurado para esta option."))
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
