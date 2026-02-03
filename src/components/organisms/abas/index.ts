import Z, { div, nav, Section, Zeyo, ZeyoAs } from "zeyo";
import style from "./aba.module.css"
import Aba from "./aba";
import App from "../../../app";
import icons from "../../atoms/icons";

export default class Abas extends Section {
    display = div().class(style.display, "d-grid")
    tabs = nav().class(style.abas).clickevent(e => {
        /* const element = (e.target as HTMLElement)
        if (element.dataset.slide)
            this.changeSlide(this.element, element.dataset.slide); */
    })
    constructor(app: App) {
        super();
        
        this.class("d-grid"/* , "ac-start" */, style.container).children(
            this.tabs,
            this.display
        )
    }

    push(aba: Aba) {
        this.tabs.children(
            Z("a").class("d-flex", "gap-m", style.aba, aba.selected ? style.selected : "")
                .attribute("data-slide", aba.value)
                .children(
                    icons(aba.icon),
                    Z("span").text(aba.titulo)
                ).click(o => {
                    this.changeSlide(this.element, aba.value)
                })
                
        )
        this.display.children(
            aba.componente.class(style.slide, aba.selected ? style.active : "", "o-auto", "d-grid").attribute("data-slide", aba.value)
        );
        return this
    }

    main = Z("section").class()
    create() {
        //this.clear()
        // TODO: aqui deveria ser o Zeyo controlando e emitindo o mesmo eventos aos filhos para eles lidarem com remocao de listner de eventos por exemplo
        this.main.element.innerHTML = ""
    };

    changeSlide(parentCategoria: HTMLElement, target?: string): { active: HTMLElement, target: HTMLElement } {
        const nav = (parentCategoria.childNodes[0] as HTMLElement)
        const navNodes = (nav.childNodes as any);
        for (const tab of (navNodes as HTMLElement[])) {
            if (tab.dataset.slide === target) {
                tab.classList.add(style.selected)
                nav.scrollTo({
                    top: 0,
                    left: tab.offsetLeft - 10,
                    behavior: "smooth",
                })
            } else if (tab.classList.contains(style.selected))
                tab.classList.remove(style.selected)
        }

        const display = (parentCategoria.childNodes[1].childNodes as any);
        const slides: { active: HTMLElement, target: HTMLElement } = {
            active: ({} as HTMLElement),
            target: ({} as HTMLElement)
        }
        for (const slide of (display as HTMLElement[])) {
            if (slide.dataset.slide === target)
                slides.target = slide
            else if (slide.classList.contains(style.active))
                slides.active = slide

            if (slides.target.tagName)
                slide.classList.remove(style.off)
            else slide.classList.add(style.off)
        }
        slides.active.classList.remove(style.active)
        slides.target.classList.add(style.active)
        return slides
    }
}