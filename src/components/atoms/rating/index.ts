import { Div, div, span } from "zeyo";
import iconStar from "lucideIcons/iconStar";
import styles from "./styles.module.css";

export default () => (new class extends Div {
    label = span().class(styles.rating_label).text("Avalie esta aula:")
    stars: ReturnType<typeof div>[] = []
    info = span().class(styles.rating_info)
    private currentRating = 0
    private onChange: ((rating: number) => void) | null = null

    constructor() {
        super()
        this.class(styles.rating)
        this.children(this.label)

        for (let i = 1; i <= 5; i++) {
            const star = div().class(styles.rating_star).children(iconStar())
            star.on("click", () => this.select(i))
            this.stars.push(star)
            this.children(star)
        }

        this.children(this.info)
    }

    select(rating: number) {
        this.currentRating = rating
        this.render()
        if (this.onChange) this.onChange(rating)
    }

    render() {
        this.stars.forEach((star, index) => {
            if (index < this.currentRating) {
                star.class(styles.rating_star_active)
            } else {
                star.element.classList.remove(styles.rating_star_active)
            }
        })
        this.info.text(this.currentRating > 0 ? `${this.currentRating}/5` : "")
    }

    setRating(rating: number) {
        this.currentRating = rating
        this.render()
        return this
    }

    onRatingChange(cb: (rating: number) => void) {
        this.onChange = cb
        return this
    }
})
