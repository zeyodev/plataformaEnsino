import Z, { Div, ZeyoAs } from "zeyo";
import NavOption from "../../molecules/navOption";
import App from "../../../app";
import Option from "../../../options";
import style from "./style.module.css"

export default (app: App, options: Option[], cb: (option: Option) => void, selected?: number) => (new class SideNavDinamico extends Div {
    options = Z("div").class("d-grid", "gap-m", style.navigation)
    constructor() {
        super();
        this.class("d-grid", "ac-between")
            .children(
                this.options,
                ...options.map((option) => this.makeOption(option)),
            );
        if (selected === undefined) return this;
        this.show(selected)
    }

    update(...options: Option[]) {
        this.options.children(
            ...options.map(option => this.makeOption(option))
        )
    }

    show(selected: number) {
        const option = (this.options.childList as NavOption[])[selected];
        option.selected();
        cb(option.option);
    }

    makeOption(option: Option) {
        return new NavOption(app, option, (opt) => {
            cb(opt.option);
            this.options.object(o => {
                (o.childList as NavOption[]).forEach(i => {
                    if (i.option.path === option.path)
                        i.selected();
                    else
                        i.deselected();
                })
            })
        })
    }
})