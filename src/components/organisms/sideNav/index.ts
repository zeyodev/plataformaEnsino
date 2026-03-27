import { div, Div, ZeyoAs } from "zeyo";
import NavOption from "../../molecules/navOption";
import App from "../../../app";
import Option from "../../../options";
import style from "./style.module.css"
import Logo from "../../atoms/logo";

/**
 * Componente da barra lateral de ferramentas
 */
export default class SideNav extends Div {
    private optionsContainer = div().class("d-grid", "gap-m");

    constructor(private app: App, backoption?: boolean) {
        super();
        this.class("d-grid", "gap-m", style.navigation)
        this.children(new Logo())
        if(backoption)
        this.children(
            new NavOption(this.app, (new class extends Option {
                component = div()
                constructor() { super("voltar", "Voltar", "iconArrowLeft", "voltar") }
            }), () => { window.history.back() }),
        )
        this.children(this.optionsContainer)
    }

    setInfo(options: Option[], cb: (option: Option) => void, selected?: number) {
        this.optionsContainer.children(
            ...options.map((option) => {
                return new NavOption(this.app, option, (opt) => {
                    cb(opt.option);
                    this.optionsContainer.object(o => {
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

        const option = (this.optionsContainer.childList as NavOption[])[selected];
        option.selected();
        cb(option.option);

        return this;
    }
}