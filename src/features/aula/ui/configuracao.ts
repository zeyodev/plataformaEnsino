import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import FormUpdateAula from "../form/update";
import uploadVideo from "./uploadVideo";
import transcricao from "./transcricao";
import materiaisComplementares from "./materiaisComplementares";

export default (app: App, obj: any) =>
    new Abas(app)
        .push(new Aba("editar", "Editar Aula", "iconEdit", new FormUpdateAula(app, obj), true))
        .push(new Aba("video", "Vídeo", "iconVideo", uploadVideo(app, obj)))
        .push(new Aba("transcricao", "Transcrição", "iconFileText", transcricao(app, obj)))
        .push(new Aba("materiais", "Materiais Complementares", "iconPaperclip", materiaisComplementares(app, obj)))
