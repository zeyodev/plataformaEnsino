import Z, { div } from "zeyo";
import Option from "..";
import App from "../../app";
import VideoPlayer from "../../states/aula/VideoPlayer";
import Recommendations from "../../states/aula/Recommendations";
import VideoCard from "../../states/aula/VideoCard";
import cssStyles from "../../states/aula/styles.module.css";

const styles = {
    mainLayout: cssStyles["App_mainLayout"],
};

export default class OptionPlayer extends Option {
    constructor(private app: App, private aula: any) {
        super("player", "Player", "iconPlayCircle", "player")
    }

    component = Z("div").class("gap-g", "ac-start").children(
        div().class(styles.mainLayout).children(
            VideoPlayer(this.app).object(o => {
                o.setTitulo(this.aula.title)
                o.setVideo(this.aula.video_hls)
                o.loadRating(this.aula._id)
            }),
            Recommendations(this.app).object(async o => {
                let moduloId = this.aula.modulo
                if (!moduloId) {
                    const [moduloAula] = await this.app.repository.findOne("ModuloAulas", { aula: this.aula._id })
                    moduloId = moduloAula?.modulo
                }
                if (!moduloId) return

                const [aulas] = await (this.app.repository as any).findManyToMany("ModuloAulas/aula:Aulas", { modulo: moduloId })
                o.children(...aulas.map((aula: any) => VideoCard(this.app).object(o => o.setAula(aula))))

                const [modulo] = await this.app.repository.findOne("Modulos", {_id: moduloId})
                if (modulo) o.setChip(modulo.titulo)
            })
        )
    );
}
