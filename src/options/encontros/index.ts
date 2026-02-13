import Z, { div, h1 } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import ComponenteEngine from "../../features/componente/engine";

export default class OptionEncontros extends Option {
    constructor(private app: App) {
        super("encontros", "Encontros ao vivo", "iconVideo", "encontros")
    }

    gotError = false;

    component = Z("div").class("gap-g", "ac-start").children(
        h1(this.title),
        new Abas(this.app).object(async objectAbas => {
            const [encontros] = await this.app.repository.findMany("CategoriasEncontros", {})
            for (const [i, categoriasEncontros] of encontros.entries()) {
                objectAbas.push(new Aba(categoriasEncontros.value, categoriasEncontros.titulo, categoriasEncontros.icon, div().object(async o => {
                    // aqui tem q colocar o botão que linka com o google meet
                    const [component] = await this.app.repository.findOne("Componentes", { _id: "sdfwefsdfwe3" })
                    o.children(...(await ComponenteEngine.execute(this.app, component, { categoriasEncontros })))
                }), i === 0))
            }
        })
    );
}