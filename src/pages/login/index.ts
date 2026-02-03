import { Main, ZeyoAs } from "zeyo";
import App from "../../app";
import FormLogin from "../../features/usuario/form/login";
import FormCreateUsuario from "../../features/usuario/form/create";
import style from "./style.module.css";
import Abas from "../../components/organisms/abas";
import Aba from "../../components/organisms/abas/aba";
import Card from "../../components/atoms/card";

export default class Login extends Main {
    constructor(private app: App) {
        super();
        this.class(style.layout).children(
            new Card().children(
                new Abas(app)
                    .push(new Aba("login", "Entrar", "iconLogIn", new FormLogin(app), true))
                    .push(new Aba("create", "Criar Conta", "iconPlus", new FormCreateUsuario(app)))
            )
        )
    }
}
