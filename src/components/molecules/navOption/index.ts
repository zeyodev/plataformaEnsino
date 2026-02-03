import Z, { A, div, ZeyoAs } from "zeyo";
import App from "../../../app";
import style from "./style.module.css";
import Option from "../../../options";
import iconCheck from "icons/src/business_and_online_icons/iconCheck";
import iconEdit from "icons/src/business_and_online_icons/iconEdit";
import FormUpdateNicho from "../../../features/nicho/form/update";
import Modal from "../../../states/Modal";
import modal from "../modal";
import icons from "../../atoms/icons";
import Abas from "../../organisms/abas";
import Aba from "../../organisms/abas/aba";
import CRUD from "../../organisms/CRUD";
import FormCreateComponente from "../../../features/componente/form/create";
import Componentes from "../../../features/componente/list";

export default class NavOption extends A {
    icon = iconCheck();
    span = Z("span");
    edit = false
    constructor(private app: App, public option: Option, cb: (option: NavOption) => void) {
        super();
        this.class(style["nav-option"], "d-flex", "gap-m").children(
            this.icon = typeof option.icon === "string" ? icons((option.icon as any)) : option.icon,
            div(
                this.span.text(option.title || (option as any).nome),
                iconEdit().click(() => {
                    this.edit = true
                    app.context.setState(Modal("create", modal(app, new Abas(app)
                        .push(new Aba("config", "Configuração", "iconSettings", new FormUpdateNicho(app, (option as any)), true))
                        .push(new Aba("compo", "Componente", "iconStar", CRUD(app, "Componentes", {create: "Novo Componente"}, {
                            create: new FormCreateComponente(app, option),
                            read: {pertence: option._id},
                            update: (app, obj) => Componentes.list[obj.tipo].config(app, obj)
                        }, {nome: "string"})))
                    ))).handle()
                })
            ).class("d-flex", "w-100", "jc-between"),
        ).click(() => {
            if (!this.edit)
                cb(this)
            this.edit = this.edit ? false : true
        })
    }

    selected() {
        this.class(style["selected"]);
    }

    deselected() {
        this.element.classList.remove(style["selected"]);
    }

    toggle() {
        this.element.classList.toggle(style["selected"]);
    }
}