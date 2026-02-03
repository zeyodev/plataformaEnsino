import { Div, ZeyoAs } from "zeyo";
import style from "./style.module.css"
export type ChangeSlide = (target: any, value?: any) => void
export default class LayoutColumnsToTabs extends Div {
    slides: any[] = []

    setSlides(cb: (changeSlide: ChangeSlide) => any[]) {
        const slides = cb(this.changeSlide.bind(this))
        this.slides.push(...slides)
        this.slides[0].class(style.active)
        this.class(style.display).children(
            ...this.slides.map(s => s.class(style["slide"]))
        )
        return this
    }

    changeSlide(target: any, value?: any): void {
        let founded = false
        for (const slide of this.slides) {
            console.log(slide)
            if (slide.element.classList.contains(style.active))
                slide.element.classList.remove(style.active)

            if (slide.name === target.name) {
                if(slide.setup) slide.setup(value)
                slide.element.classList.add(style.active)
                slide.element.classList.remove(style.off)
                founded = true
            } else if (founded)
                slide.element.classList.remove(style.off)
            else
                slide.element.classList.add(style.off)
        }
    }
}