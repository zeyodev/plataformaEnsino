import Z, { div, h1, p } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import RoadmapDiagram from "../../components/organisms/RoadmapDiagram";

export default class OptionJornadasProduto extends Option {
    component: any

    constructor(private app: App, produtoOption: any) {
        super(produtoOption._id, produtoOption.nome, produtoOption.icon, produtoOption._id)
        this.component = Z("div").class("gap-g", "ac-start").children(
            h1(produtoOption.nome),
            new Abas(this.app).object(async objectAbas => {
                const [vinculadas] = await this.app.repository.findMany("ProdutoOptionJornadas", { produtoOption: produtoOption._id })
                const jornadaIds = vinculadas.map((v: any) => v.jornada)
                if (jornadaIds.length === 0) {
                    objectAbas.element.replaceWith(div().children(p("Nenhuma jornada configurada para esta option.")).element)
                    return
                }
                const [jornadas] = await this.app.repository.findMany("Jornadas", { _id: jornadaIds })
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
        )
    }
}
