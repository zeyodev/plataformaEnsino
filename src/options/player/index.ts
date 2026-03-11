import Z, { div } from "zeyo";
import Option from "..";
import App from "../../app";
import VideoPlayer from "../../states/aula/VideoPlayer";
import Recommendations from "../../states/aula/Recommendations";
import ComponenteEngine from "../../features/componente/engine";
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
                o.setVideo(this.aula.video_player)
                o.loadRating(this.aula._id)
            }),
            Recommendations(this.app).object(async o => {
                o.children(...(await ComponenteEngine.execute(this.app, {
                    type: "adaptador",
                    component: "VideoCard",
                    map: "aosdfjw2d",
                    documents: { type: "repository", method: "findManyToMany", params: ["ModuloAulas/aula:Aulas", { modulo: "$modulo" }] },
                }, {modulo: this.aula.modulo})))

                const [modulo] = await this.app.repository.findOne("Modulos", {_id: this.aula.modulo})
                o.setChip(modulo.titulo)
            })
        )
    );
}
