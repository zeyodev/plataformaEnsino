import Z, { Div } from "zeyo";
import style from "./style.module.css";
import iconSearch from "icons/src/business_and_online_icons/iconSearch";
import App from "../../../app";
import Modal from "../../../states/Modal";
import modal from "../../molecules/modal";
import aiChat from "../../organisms/aiChat";

export default (app: App) => (new class SearchInput extends Div {
    input = Z("input");

    setPlaceholder(placeholder: string = "Alguma duvida? escreva aqui...") {
        this.input.set("placeholder", placeholder)
        return this
    }
    onSearch(cb: (value: string) => void) {
        this.input.on("input", () => {
            cb((this.input.element as HTMLInputElement).value)
        })
        return this
    }
}).class(style.search).object(o => o.children(
    iconSearch(),
    o.input.set("type", "text"),
)).click((o, e) => {
    e.preventDefault()
    const query = (o.input.element as HTMLInputElement).value;
    const chat = aiChat(app);
    if (query) chat.setInitialQuery(query);
    (o.input.element as HTMLInputElement).value = "";
    app.context.setState(Modal("duvida", modal(app, chat).style("botton"))).handle()
})
