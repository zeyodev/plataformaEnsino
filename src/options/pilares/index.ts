import Z, { div, h1 } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import ComponenteEngine from "../../features/componente/engine";

export default class OptionPilares extends Option {
    constructor(private app: App) {
        super("pilares", "Pilares Fundamentais", "iconPlay", "pilares")
    }

    gotError = false;

    component = Z("div").class("gap-g", "ac-start").children(
        h1(this.title),
        new Abas(this.app).object(async objectAbas => {
            const [pilares] = await this.app.repository.findMany("Pilares", {})
            for (const [i, pilar] of pilares.entries()) {
                objectAbas.push(new Aba(pilar.value, pilar.titulo, pilar.icon, div().object(async o => {
                    const [component] = await this.app.repository.findOne("Componentes", { _id: "sdfwefsdfwe2" })
                    o.children(...(await ComponenteEngine.execute(this.app, component, { pilar })))
                }), i === 0))
            }
        })
    );
}