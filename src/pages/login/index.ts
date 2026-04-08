declare const process: { env: { [key: string]: string } }
import { Main, div, section, h1, p, span, footer, img } from "zeyo";
import App from "../../app";
import FormLogin from "../../features/usuario/form/login";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import FormCreateUsuario from "../../features/usuario/form/create";
import Button from "../../components/atoms/button";
import style from "./style.module.css";

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL || "https://autenticador.zeyo.org";

export default class Login extends Main {
    constructor(app: App) {
        super();

        this.class(style.layout).children(
            // Painel esquerdo — identidade Duo Academy
            section(
                div(
                    img()
                        .set("src", "/_img/logo.jpg")
                        .set("alt", "Duo Academy")
                        .class(style.brandLogo),
                ).class(style.brandHeader),

                div(
                    span("Plataforma de Ensino").class(style.eyebrow),
                    h1("Aprenda.\nCresça.\nDestaque-se.").class(style.headline),
                    p("Trilhas de aprendizado, aulas ao vivo e mentorias — tudo pensado para acelerar o seu desenvolvimento profissional.")
                        .class(style.description),
                ).class(style.brandContent),

                footer(
                    p("© 2026 Duo Academy. Todos os direitos reservados.")
                ).class(style.brandFooter)
            ).class(style.brandPanel),

            // Painel direito — formulário
            section(
                div(
                    div(
                        span("Duo").class(style.formLogoDuo),
                        span("Academy").class(style.formLogoAcademy),
                    ).class(style.formLogo),

                    new Abas(app)
                        .push(new Aba("login", "Entrar", "iconLogIn", new FormLogin(app), true))
                        .push(new Aba("create", "Criar Conta", "iconPlus", new FormCreateUsuario(app))),

                    div(
                        div().class(style.divider),
                        span("ou").class(style.dividerText),
                        div().class(style.divider),
                    ).class(style.dividerRow),

                    Button("Entrar com Google").style("no-bg").class(style.googleBtn)
                        .click(() => {
                            window.location.href = `${AUTH_SERVER_URL}/auth/google`;
                        }),
                ).class(style.formContainer),
            ).class(style.formPanel),
        );
    }
}
