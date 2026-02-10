import { div, h3, img, span } from "zeyo";
import styles from "./styles.module.css"

export default (props: any) => {
    /* const styles = {
        container: "VideoCard_container",
        thumb: "VideoCard_thumb",
        thumbImg: "VideoCard_thumbImg",
        duration: "VideoCard_duration",
        info: "VideoCard_info",
        title: "VideoCard_title",
        meta: "VideoCard_meta"
    }; */

    return div().class(styles["VideoCard_container"]).children(
        // Thumbnail
        div().class(styles.VideoCard_thumb).children(
            img().class(styles.VideoCard_thumbImg).attribute("src", `https://picsum.photos/seed/${props.imageSeed}/320/180`),
            span().class(styles.VideoCard_duration).text(props.duration)
        ),
        // Info
        div().class(styles.VideoCard_info).children(
            h3().class(styles.VideoCard_title).text(props.title),
            span().class(styles.VideoCard_meta).text(props.channel),
            span().class(styles.VideoCard_meta).text(`${props.views} • ${props.time}`)
        )
    );
};