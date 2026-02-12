import { button, div, Div } from "zeyo";
import App from "../../../app";
import VideoCard from "../VideoCard";
import styles from "./styles.module.css";
import { IZeyo } from "zeyo/src/zeyo";

export default (app: App) => (new class extends Div {

    // 1. Definição dos Elementos Estruturais
    chipBar = div().class(styles.Recommendations_chipBar)

    // 2. Helpers para criação de sub-componentes
    // Cria um botão de chip (filtro)
    private createChip(text: string, isActive: boolean = false) {
        const btn = button().class(styles.Recommendations_chip).text(text);
        if (isActive) btn.class("active"); // Adiciona classe 'active' se necessário
        return btn;
    }

    setChip(nome: string) {
        this.chipBar.children(this.createChip(nome, true))
    }

    // Cria um VideoCard utilizando a nova interface de classe
    private createVideo(props: any) {
        return VideoCard(app).object(card => card.setData(props));
    }

    setVideos(...child: Array<IZeyo<keyof HTMLElementTagNameMap> | string>) {

    }

}).class(styles.Recommendations_section).object(o => o.children(
    o.chipBar,
));