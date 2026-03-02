import Z, { div, h1 } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import RoadmapDiagram from "../../components/organisms/RoadmapDiagram";

export default class OptionJornadas extends Option {
    constructor(private app: App) {
        super("jornadas", "Jornadas", "iconCompass", "jornadas")
    }

    gotError = false;

    component = Z("div").class("gap-g", "ac-start").children(
        h1(this.title),
        new Abas(this.app).object(async objectAbas => {
            const [jornadas] = await this.app.repository.findMany("Jornadas", {})
            for (const [i, jornada] of jornadas.entries()) {
                objectAbas.push(new Aba(jornada._id, jornada.titulo, jornada.icon, div().object(async o => {
                    const [nodes] = await this.app.repository.findMany("JornadaNodes", { jornada: jornada._id })
                    const [connections] = await this.app.repository.findMany("JornadaConnections", { jornada: jornada._id })

                    const diagram = new RoadmapDiagram(this.app)
                    diagram.setNodes(nodes)
                    diagram.setConnections(connections)
                    o.children(diagram)
                }), i === 0))
            }
        })
    );
}
