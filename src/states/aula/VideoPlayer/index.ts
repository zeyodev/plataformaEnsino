import { button, div, h1, h3, video, img, p, span, Div } from "zeyo";
import Hls from "hls.js";
import App from "../../../app";
import Rating from "../../../components/atoms/rating";
import style from "./styles.module.css";

const COMPLETION_THRESHOLD = 0.9;
const SAVE_INTERVAL = 10;

export default (app: App) => (new class extends Div {
    // 1. Definição dos Elementos (Propriedades)
    wrapper = div().class(style.VideoPlayer_wrapper)
    videoEl = video().class(style.VideoPlayer_video).attribute("controls", "true")

    info = div().class(style.VideoPlayer_info)
    titulo = h1().class(style.VideoPlayer_title)

    metaRow = div().class(style.VideoPlayer_metaRow)
    channelInfo = div().class(style.VideoPlayer_channelInfo)
    channelAvatar = img().class(style.VideoPlayer_channelAvatar)
    channelText = div().class(style.VideoPlayer_channelText)
    channelName = h3()
    channelSubs = span()
    subscribeBtn = button().class(style.VideoPlayer_subscribeBtn).text("Inscrever-se")

    progressBar = div().class(style.VideoPlayer_progressBar)
    progressFill = div().class(style.VideoPlayer_progressFill)
    progressLabel = span().class(style.VideoPlayer_progressLabel)
    completionBadge = span().class(style.VideoPlayer_completionBadge).text("Aula concluída ✓")

    descBox = div().class(style.VideoPlayer_descriptionBox)
    viewsInfo = span()
    descText = p()

    private aulaId = ""
    private hls: Hls | null = null
    private completed = false
    private lastSavedTime = 0

    ratingComponent = Rating().onRatingChange(async (rating) => {
        const [existing] = await app.repository.findOne("AulaAvaliacoes", { aulaId: this.aulaId })
        if (existing && existing._id) {
            await app.repository.update("AulaAvaliacoes", existing._id, { rating })
        } else {
            await app.repository.create("AulaAvaliacoes", { aulaId: this.aulaId, rating })
        }
    })

    // 2. Setters para Injeção de Dados (Padrão do Exemplo)
    setVideo(url: string) {
        const videoElement = this.videoEl.element as HTMLVideoElement;
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
        if (Hls.isSupported()) {
            this.hls = new Hls();
            this.hls.loadSource(url);
            this.hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
            videoElement.src = url;
        }

        videoElement.addEventListener("timeupdate", () => this.onTimeUpdate(videoElement));
        videoElement.addEventListener("ended", () => this.onVideoEnded());
    }

    setTitulo(titulo: string) {
        this.titulo.text(titulo);
    }
    setMeta(titulo: string, views: string, description: string) {
        this.titulo.text(titulo);
        this.viewsInfo.HTML(`<strong>${views}</strong>`);
        this.descText.text(description);
    }

    setChannel(name: string, avatar: string, subs: string) {
        this.channelName.text(name);
        this.channelAvatar.attribute("src", avatar);
        this.channelSubs.text(subs);
    }

    async loadRating(aulaId: string) {
        this.aulaId = aulaId
        const [avaliacao] = await app.repository.findOne("AulaAvaliacoes", { aulaId })
        if (avaliacao && avaliacao._id) this.ratingComponent.setRating(avaliacao.rating)
        await this.loadProgress(aulaId)
    }

    // 3. Controle de progresso e conclusão
    private async loadProgress(aulaId: string) {
        const [conclusao] = await app.repository.findOne("AulaConclusoes", { aulaId })
        if (conclusao && conclusao._id) {
            this.updateProgressUI(conclusao.progresso)
            if (conclusao.concluida) {
                this.completed = true
                this.showCompletionBadge()
            }
            const videoElement = this.videoEl.element as HTMLVideoElement;
            if (!conclusao.concluida && conclusao.tempoAssistido > 0) {
                videoElement.addEventListener("loadedmetadata", () => {
                    videoElement.currentTime = conclusao.tempoAssistido;
                }, { once: true })
            }
        }
    }

    private onTimeUpdate(videoElement: HTMLVideoElement) {
        const { currentTime, duration } = videoElement;
        if (!duration || duration === Infinity) return;

        const progresso = currentTime / duration;
        this.updateProgressUI(progresso);

        if (!this.completed && progresso >= COMPLETION_THRESHOLD) {
            this.completed = true;
            this.markCompleted(currentTime, duration);
        }

        if (Math.abs(currentTime - this.lastSavedTime) >= SAVE_INTERVAL) {
            this.lastSavedTime = currentTime;
            this.saveProgress(currentTime, duration);
        }
    }

    private onVideoEnded() {
        this.updateProgressUI(1);
        if (!this.completed) {
            this.completed = true;
            const videoElement = this.videoEl.element as HTMLVideoElement;
            this.markCompleted(videoElement.duration, videoElement.duration);
        }
    }

    private updateProgressUI(progresso: number) {
        const pct = Math.min(Math.round(progresso * 100), 100);
        (this.progressFill.element as HTMLElement).style.width = `${pct}%`;
        this.progressLabel.text(`${pct}% concluído`);
    }

    private showCompletionBadge() {
        (this.completionBadge.element as HTMLElement).style.display = "inline-block";
    }

    private async saveProgress(tempoAssistido: number, duracao: number) {
        const aulaId = this.aulaId;
        const progresso = tempoAssistido / duracao;
        const [existing] = await app.repository.findOne("AulaConclusoes", { aulaId })
        if (existing && existing._id) {
            await app.repository.update("AulaConclusoes", existing._id, { tempoAssistido, progresso })
        } else {
            await app.repository.create("AulaConclusoes", { aulaId, tempoAssistido, duracao, progresso, concluida: false })
        }
    }

    private async markCompleted(tempoAssistido: number, duracao: number) {
        const aulaId = this.aulaId;
        this.showCompletionBadge();
        const [existing] = await app.repository.findOne("AulaConclusoes", { aulaId })
        if (existing && existing._id) {
            await app.repository.update("AulaConclusoes", existing._id, {
                tempoAssistido, progresso: 1, concluida: true, concluidaEm: Date.now()
            })
        } else {
            await app.repository.create("AulaConclusoes", {
                aulaId, tempoAssistido, duracao, progresso: 1, concluida: true, concluidaEm: Date.now()
            })
        }
    }
}).class(style.VideoPlayer_section).object(o => o.children(
    // 4. Composição da Árvore DOM
    o.wrapper.children(
        o.videoEl
    ),
    o.info.children(
        o.titulo,
        o.metaRow.children(
           /*  o.channelInfo.children(
                //o.channelAvatar,
                o.channelText.children(
                    o.channelName,
                    o.channelSubs
                ),
                o.subscribeBtn
            ) */
        ),
        o.progressBar.children(
            o.progressFill
        ),
        o.progressLabel,
        o.completionBadge,
        o.ratingComponent,
        o.descBox.children(
            o.viewsInfo,
            o.descText
        )
    )
));

/**
 * {
      "id": "3c215b8d-d309-447e-9c6d-2b038bc097fd",
      "title": "Aula 11 -MESL- Como atrair e escolher os profissionais certos para seu salão. 11.08.25",
      "description": "",
      "status": "CONVERTED",
      "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
      "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
      "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
      "live_id": null,
      "video_external_id": "416ff6ee-9cfc-40b4-b902-d599c271c7b4",
      "converted_at": null,
      "created_at": "2025-08-12T12:00:55.000Z",
      "updated_at": "2025-08-12T13:24:22.000Z",
      "storage_size": 2158182834,
      "length": 5570.76,
      "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=416ff6ee-9cfc-40b4-b902-d599c271c7b4",
      "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/416ff6ee-9cfc-40b4-b902-d599c271c7b4/playlist.m3u8",
      "width": 1760,
      "height": 900,
      "playable": true,
      "available_resolutions": [
        "360p",
        "480p",
        "720p"
      ],
      "backup": true,
      "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/preview.webp",
      "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/thumbnail.jpg",
      "playback": [
        "360p",
        "480p",
        "720p",
        "1080p"
      ],
      "pending_resolutions": []
    }
 */