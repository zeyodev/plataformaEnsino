import { div, h3, img, span, Div } from "zeyo";
import App from "../../../app";
import styles from "./styles.module.css";

export default (app: App) => (new class extends Div {
    
    // 1. Definição dos Elementos (Propriedades Visuais)
    thumb = div().class(styles.VideoCard_thumb)
    thumbImg = img().class(styles.VideoCard_thumbImg)
    duration = span().class(styles.VideoCard_duration)
    
    info = div().class(styles.VideoCard_info)
    titulo = h3().class(styles.VideoCard_title)
    channel = span().class(styles.VideoCard_meta)
    stats = span().class(styles.VideoCard_meta)

    // 2. Estado interno para propriedades combinadas
    private _views: string = "";
    private _time: string = "";

    // 3. Método Genérico para definir texto
    setText(key: string, value: string) {
        (this as any)[key].text(value);
    }

    // 4. Setters usando bind para reutilizar setText
    setDuration = this.setText.bind(this, "duration")
    setTitle = this.setText.bind(this, "titulo")
    setChannel = this.setText.bind(this, "channel")

    // 5. Setters com lógicas específicas
    
    // Define a imagem (lógica de atributo src)
    setImage(seed: string) {
        this.thumbImg.attribute("src", `https://picsum.photos/seed/${seed}/320/180`);
    }

    // Define as visualizações (atualiza estado + stats combinados)
    setViews(value: string) {
        this._views = value;
        this.updateStats();
    }

    // Define o tempo (atualiza estado + stats combinados)
    setTime(value: string) {
        this._time = value;
        this.updateStats();
    }

    // Atualiza o texto combinado de estatísticas
    private updateStats() {
        this.stats.text(`${this._views} • ${this._time}`);
    }

    // Preenchimento em lote
    setData(props: any) {
        this.setImage(props.imageSeed);
        this.setDuration(props.duration);
        this.setTitle(props.title);
        this.setChannel(props.channel);
        this.setViews(props.views);
        this.setTime(props.time);
    }

}).class(styles.VideoCard_container).object(o => o.children(
    o.thumb.children(
        o.thumbImg,
        o.duration
    ),
    o.info.children(
        o.titulo,
        o.channel,
        o.stats
    )
));