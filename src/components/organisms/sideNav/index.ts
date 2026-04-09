import Z, { div, Div } from "zeyo";
import NavOption from "../../molecules/navOption";
import App from "../../../app";
import Option from "../../../options";
import style from "./style.module.css"
import Logo from "../../atoms/logo";
import icons from "../../atoms/icons";

/**
 * Componente da barra lateral de ferramentas
 */
export default class SideNav extends Div {
    private optionsContainer = div().class(style.navItems);
    private backOptionOffset = 0;

    constructor(private app: App, backoption?: boolean) {
        super();
        this.class(style.sideNav)

        // Cabeçalho: logo + nome do produto
        const header = div().class(style.navHeader).attribute("data-nav-header", "").children(
            div().class(style.logoWrap).children(new Logo()),
            div().class(style.workspaceText).attribute("data-expanded-only", "").children(
                Z("span").class(style.workspaceName).text("Duo Academy"),
                Z("span").class(style.workspacePlan).text("Plataforma de Ensino"),
            ),
        );

        if (backoption) {
            this.optionsContainer.children(
                new NavOption(this.app, (new class extends Option {
                    component = div()
                    constructor() { super("voltar", "Voltar", "iconArrowLeft", "voltar") }
                }), () => { window.history.back() }),
            )
            this.backOptionOffset = 1;
        }

        // Rodapé: configurações + ajuda
        const footer = div().class(style.navFooter).children(
            div().class(style.footerItem).attribute("data-footer-item", "").children(
                icons("iconSettings"),
                Z("span").class(style.footerLabel).attribute("data-expanded-only", "").text("Configurações"),
            ),
            div().class(style.footerItem).attribute("data-footer-item", "").children(
                icons("iconCircleHelp"),
                Z("span").class(style.footerLabel).attribute("data-expanded-only", "").text("Ajuda"),
            ),
        );

        this.children(header, this.optionsContainer, footer);
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

        const option = (this.optionsContainer.childList as NavOption[])[selected + this.backOptionOffset];
        option.selected();
        cb(option.option);

        return this;
    }
}
