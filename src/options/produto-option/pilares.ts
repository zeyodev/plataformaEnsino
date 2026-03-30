import Z, { div, h1, p } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import ListaComTitulo from "../../components/organisms/ListaComTitulo";
import CardAula from "../../components/organisms/CardAula";

export default class OptionPilaresProduto extends Option {
    component: any

    constructor(private app: App, produtoOption: any) {
        super(produtoOption._id, produtoOption.nome, produtoOption.icon, produtoOption._id)
        this.component = Z("div").class("gap-g", "ac-start").children(
            h1(produtoOption.nome),
            new Abas(this.app).object(async objectAbas => {
                console.log(produtoOption._id)
                const [vinculados] = await this.app.repository.findMany("ProdutoOptionPilares", { produtoOption: produtoOption._id })
                const pilarIds = vinculados.map((v: any) => v.pilar)
                if (pilarIds.length === 0) {
                    objectAbas.element.replaceWith(div().children(p("Nenhum pilar configurado para esta option.")).element)
                    return
                }
                // TODO aqui vai ter que implementar uma forma de fazer para pegar o array de ids em uma coleção
                const [pilares] = await this.app.repository.findMany("Pilares", { _id: pilarIds })
                for (const [i, pilar] of pilares.entries()) {
                    objectAbas.push(new Aba(pilar.value, pilar.titulo, pilar.icon, div().object(async o => {
                        const [modulos] = await this.app.repository.findMany("Modulos", { pilar: pilar._id })
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
                    }), i === 0))
                }
            })
        )
    }
}
