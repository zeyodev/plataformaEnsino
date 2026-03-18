import { div } from "zeyo";
import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import FormUpdateAula from "../form/update";
import uploadVideo from "./uploadVideo";
import transcricao from "./transcricao";
import materiaisComplementares from "./materiaisComplementares";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("editar", "Editar Aula", "iconEdit",
            div().class("d-grid", "gap-g", "p-10").object(o => {
                o.children(new FormUpdateAula(app, obj))
            }), true
        ))
        .push(new Aba("video", "Vídeo", "iconVideo",
            div().class("d-grid", "gap-g", "p-10").object(o => {
                o.children(uploadVideo(app, obj))
            })
        ))
        .push(new Aba("transcricao", "Transcrição", "iconFileText",
            div().class("d-grid", "gap-g", "p-10").object(o => {
                o.children(transcricao(app, obj))
            })
        ))
        .push(new Aba("materiais", "Materiais Complementares", "iconPaperclip",
            div().class("d-grid", "gap-g", "p-10").object(o => {
                o.children(materiaisComplementares(app, obj))
            })
        ))
