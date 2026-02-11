import { button, div } from "zeyo";
import VideoCard from "../VideoCard";
import cssstyles from "./styles.module.css";

export default () => {
                const styles = {
                    section: cssstyles["Recommendations_section"],
                    chipBar: cssstyles["Recommendations_chipBar"],
                    chip: cssstyles["Recommendations_chip"]
                };

                return div().class(styles.section).children(
                    // Chips
                    div().class(styles.chipBar).children(
                        button().class(styles.chip, "active").text("Playlist"),
                    ),
                    // Lista de vídeos (Reutilizando VideoCard)
                    /* VideoCard(({} as any)).setData({ title: "Tutorial de JavaScript Avançado 2024", channel: "DevMaster", views: "15K visualizações", time: "há 2 dias", imageSeed: "js", duration: "12:40" }),
                    VideoCard(({} as any)).setData({ title: "As melhores praias do Brasil", channel: "Viagem Hoje", views: "230K visualizações", time: "há 1 semana", imageSeed: "brazil", duration: "08:15" }),
                    VideoCard(({} as any)).setData({ title: "Review: Novo Smartphone X", channel: "TechReview", views: "1M visualizações", time: "há 3 horas", imageSeed: "phone", duration: "15:20" }),
                    VideoCard(({} as any)).setData({ title: "Música Lofi para programar", channel: "Lofi Girl", views: "50K assistindo", time: "AO VIVO", imageSeed: "lofi", duration: "🔴" }),
                    VideoCard(({} as any)).setData({ title: "Construindo uma casa do zero", channel: "Arquitetura Viva", views: "89K visualizações", time: "há 5 dias", imageSeed: "house", duration: "24:10" }),
                    VideoCard(({} as any)).setData({ title: "Receita de Carbonara Original", channel: "Chef Mario", views: "45K visualizações", time: "há 1 ano", imageSeed: "food", duration: "06:30" }),
                    VideoCard(({} as any)).setData({ title: "Documentário: Espaço Sideral", channel: "Cosmos", views: "3M visualizações", time: "há 1 mês", imageSeed: "space", duration: "45:00" }) */
                );
            };