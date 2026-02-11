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

    constructor() {
        super();
        // Configurações Iniciais Estáticas
        this.frame.attribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                  .attribute("allowfullscreen", "true");

        // Preenchimento dos dados (hardcoded conforme original, mas agora via setters)
        this.setVideo("https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1");
        this.setMeta(
            "Costa Rica em 4K - Natureza Relaxante e Vida Selvagem",
            "543 mil visualizações • há 4 horas",
            "Experimente a beleza da natureza neste vídeo 4K de tirar o fôlego. Imagens capturadas na Costa Rica mostrando a incrível biodiversidade..."
        );
        this.setChannel("Mundo Selvagem", "https://picsum.photos/seed/nat/100/100", "1.2M inscritos");
    }

}).class(style.VideoPlayer_section).object(o => o.children(
    // 3. Composição da Árvore DOM
    o.wrapper.children(
        o.frame
    ),
    o.info.children(
        o.titulo,
        o.metaRow.children(
            o.channelInfo.children(
                o.channelAvatar,
                o.channelText.children(
                    o.channelName,
                    o.channelSubs
                ),
                o.subscribeBtn
            )
        ),
        o.descBox.children(
            o.viewsInfo,
            o.descText
        )
    )
));