import { div, Div, ZeyoAs } from "zeyo";
import NavOption from "../../molecules/navOption";
import App from "../../../app";
import Option from "../../../options";
import style from "./style.module.css"

export default class SideNav extends Div {
    constructor(private app: App, private backoption?: boolean) {
        super();
        this.class("d-grid", "gap-m", style.navigation)
        if(backoption)
        this.children(
            new NavOption(this.app, (new class extends Option {
                component = div()
                constructor() { super("voltar", "Voltar", "iconArrowLeft", "voltar") }
            }), () => { window.history.back() }),
        )
    }

    setInfo(options: Option[], cb: (option: Option) => void, selected?: number) {
        this.children(
            ...options.map((option) => {
                return new NavOption(this.app, option, (opt) => {
                    cb(opt.option);
                    this.object(o => {
                        (o.childList as NavOption[]).forEach(i => {
                            if (i.option.path === option.path)
                                i.selected();
                            else
                                i.deselected();
                        })
                    })

                })
            }),
        );
        if (selected === undefined) return this;

        const option = (this.childList as NavOption[])[this.backoption ? selected + 1 :selected];
        option.selected();
        cb(option.option);

        return this;
    }
}