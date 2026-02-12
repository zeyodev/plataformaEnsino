import { button, div, h1, h3, iframe, img, p, span, Div } from "zeyo";
import App from "../../../app";
import style from "./styles.module.css";

export default (app: App) => (new class extends Div {
    // 1. Definição dos Elementos (Propriedades)
    wrapper = div().class(style.VideoPlayer_wrapper)
    frame = iframe().class(style.VideoPlayer_iframe)
    
    info = div().class(style.VideoPlayer_info)
    titulo = h1().class(style.VideoPlayer_title)
    
    metaRow = div().class(style.VideoPlayer_metaRow)
    channelInfo = div().class(style.VideoPlayer_channelInfo)
    channelAvatar = img().class(style.VideoPlayer_channelAvatar)
    channelText = div().class(style.VideoPlayer_channelText)
    channelName = h3()
    channelSubs = span()
    subscribeBtn = button().class(style.VideoPlayer_subscribeBtn).text("Inscrever-se")
    
    descBox = div().class(style.VideoPlayer_descriptionBox)
    viewsInfo = span()
    descText = p()

    // 2. Setters para Injeção de Dados (Padrão do Exemplo)
    setVideo(url: string) {
        this.frame.attribute("src", url);
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
}).class(style.VideoPlayer_section).object(o => o.children(
    // 3. Composição da Árvore DOM
    o.wrapper.children(
        o.frame
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