import Z, { div, h1 } from "zeyo";
import Option from "..";
import App from "../../app";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import ListaComTitulo from "../../components/organisms/ListaComTitulo";
import CardAula from "../../components/organisms/CardAula";
import adaptador from "../../components/atoms/adaptador";

export default class OptionPilares extends Option {
    constructor(private app: App) {
        super("pilares", "Pilares Fundamentais", "iconBarChart", "pilares")
    }

    gotError = false;

    component = Z("div").class("gap-g", "ac-start").children(
        h1(this.title),
        new Abas(this.app)
            .push(new Aba("lideranca", "Liderança", "iconUsers", div(
                ListaComTitulo(this.app, "O Líder Consciente – Autoconhecimento e Inteligência Emocional", ...adaptador(CardAula, {
                    setImg: "capa",
                    setTitulo: "titulo",
                    onclick: ""
                }, ...[
                    {
                        "titulo": "A Jornada do Autoconhecimento",
                        "capa": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "titulo": "Pilares da Inteligência Emocional",
                        "capa": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "titulo": "Liderança e Empatia na Prática",
                        "capa": "https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "titulo": "Gestão de Emoções sob Pressão",
                        "capa": "https://images.unsplash.com/photo-1518072719234-a50369e601bb?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "titulo": "Comunicação Consciente e Feedback",
                        "capa": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "titulo": "Vulnerabilidade como Força Estratégica",
                        "capa": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "titulo": "O Líder como Facilitador de Talentos",
                        "capa": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                    }
                ])),
                ListaComTitulo(this.app, "Comunicação de Impacto e Cultura de Confiança", div("introdução")),
                ListaComTitulo(this.app, "Gestão de Equipes de Alta Performance e Delegação", div("introdução")),
                ListaComTitulo(this.app, "Liderança Estratégica e Gestão de Mudanças", div("introdução")),
            ).class("d-grid", "gap-g"), true))
            .push(new Aba("recepcao", "Recepção", "iconBell", div(
                "aqui tera um lista de varios videos"
            )))
            .push(new Aba("comercial", "Comercial", "iconMessageCircle", div(
                "aqui tera um lista de varios videos"
            )))
            .push(new Aba("financeiro", "Financeiro", "iconDollarSign", div(
                "aqui tera um lista de varios videos"
            )))
    );




}