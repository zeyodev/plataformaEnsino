import Z, { Div } from "zeyo";
import style from "./style.module.css";
import iconSearch from "icons/src/business_and_online_icons/iconSearch";

export default class SearchInput extends Div {
    input = Z("input")

    constructor(placeholder: string = "Pesquisar...") {
        super();
        this.class(style.search).children(
            iconSearch(),
            this.input.set("type", "text").set("placeholder", placeholder),
        )
    }

    onSearch(cb: (value: string) => void) {
        this.input.on("input", () => {
            cb((this.input.element as HTMLInputElement).value)
        })
        return this
    }
}
