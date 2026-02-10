import { button, div, h1, h3, iframe, img, p, span } from "zeyo";
import cssstyles from "./styles.module.css"
export default () => {
    const styles = {
        section: cssstyles["VideoPlayer_section"],
        wrapper: cssstyles["VideoPlayer_wrapper"],
        iframe: cssstyles["VideoPlayer_iframe"],
        info: cssstyles["VideoPlayer_info"],
        title: cssstyles["VideoPlayer_title"],
        metaRow: cssstyles["VideoPlayer_metaRow"],
        channelInfo: cssstyles["VideoPlayer_channelInfo"],
        channelAvatar: cssstyles["VideoPlayer_channelAvatar"],
        channelText: cssstyles["VideoPlayer_channelText"],
        subscribeBtn: cssstyles["VideoPlayer_subscribeBtn"],
        actions: cssstyles["VideoPlayer_actions"],
        actionBtn: cssstyles["VideoPlayer_actionBtn"],
        descBox: cssstyles["VideoPlayer_descriptionBox"]
    };

    return div().class(styles.section).children(
        // Player Wrapper
        div().class(styles.wrapper).children(
            iframe()
                .class(styles.iframe)
                .attribute("src", "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1")
                .attribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                .attribute("allowfullscreen", "true")
        ),
        // Info Wrapper
        div().class(styles.info).children(
            h1().class(styles.title).text("Costa Rica em 4K - Natureza Relaxante e Vida Selvagem"),

            // Meta Row
            div().class(styles.metaRow).children(
                // Channel Info
                div().class(styles.channelInfo).children(
                    img().class(styles.channelAvatar).attribute("src", "https://picsum.photos/seed/nat/100/100"),
                    div().class(styles.channelText).children(
                        h3().text("Mundo Selvagem"),
                        span().text("1.2M inscritos")
                    ),
                    button().class(styles.subscribeBtn).text("Inscrever-se")
                ),
                // Action Buttons
                /* div().class(styles.actions).children(
                    button().class(styles.actionBtn).children(Icon("thumbs-up"), span().text("12K")),
                    button().class(styles.actionBtn).children(Icon("thumbs-down")),
                    button().class(styles.actionBtn).children(Icon("share-2"), span().text("Compartilhar")),
                    button().class(styles.actionBtn).children(Icon("more-horizontal"))
                ) */
            ),

            // Description Box
            div().class(styles.descBox).children(
                span().HTML("<strong>543 mil visualizações • há 4 horas</strong>"),
                p().text("Experimente a beleza da natureza neste vídeo 4K de tirar o fôlego. Imagens capturadas na Costa Rica mostrando a incrível biodiversidade...")
            )
        )
    );
};