import Z, { div, span, p } from "zeyo"
import button from "../../atoms/button"
import style from "./style.module.css"

export interface WizardStep {
    label: string
    hint?: string
    field: any // Zeyo field element com getValue/setValue
    validate?: (value: any) => string | null // retorna mensagem de erro ou null
}

export default class TypeformWizard {
    element: HTMLElement
    private currentIndex = 0
    private steps: WizardStep[]
    private stepElements: HTMLElement[] = []
    private progressFill: HTMLElement
    private counterEl: HTMLElement
    private errorEl: HTMLElement
    private onCompleteCallback?: (data: { [key: string]: any }) => void

    constructor(steps: WizardStep[]) {
        this.steps = steps

        // Progress bar
        const progressBar = div().class(style.progressBar)
        const progressFillZ = div().class(style.progressFill)
        this.progressFill = progressFillZ.element
        progressBar.children(progressFillZ)

        // Steps container
        const stepsContainer = div().class(style.stepsContainer)

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i]
            const stepContent = div().class(style.stepContent)
            const labelEl = div().class(style.stepLabel).text(step.label)
            stepContent.children(labelEl)

            if (step.hint) {
                stepContent.children(div().class(style.stepHint).text(step.hint))
            }

            stepContent.children(step.field)

            const errorMsg = p("").class(style.errorMsg)
            stepContent.children(errorMsg)

            const stepWrapper = div().class(style.step, i === 0 ? style.stepActive : style.stepRight)
            stepWrapper.children(stepContent)

            stepsContainer.children(stepWrapper)
            this.stepElements.push(stepWrapper.element)
        }

        // Error element (referenciamos o do step atual)
        this.errorEl = this.stepElements[0]?.querySelector(`.${style.errorMsg}`) as HTMLElement

        // Navigation
        const btnPrev = button("← Voltar").set("type", "button").style("secondary")
        btnPrev.click(() => this.prev())

        const btnNext = button("Continuar →").set("type", "button").style("primary")
        btnNext.click(() => this.next())

        this.counterEl = span().element
        const navButtons = div().class(style.navButtons).children(btnPrev, btnNext)
        const navigation = div().class(style.navigation)
        navigation.element.appendChild(this.counterEl)
        navigation.children(navButtons)

        // Root
        const wizard = div().class(style.wizard)
        wizard.children(progressBar, stepsContainer, navigation)
        this.element = wizard.element

        // Keyboard navigation
        this.element.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                this.next()
            } else if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault()
                this.prev()
            }
        })

        this.updateUI()
    }

    private updateUI() {
        const progress = ((this.currentIndex + 1) / this.steps.length) * 100
        this.progressFill.style.width = `${progress}%`
        this.counterEl.textContent = `${this.currentIndex + 1} / ${this.steps.length}`

        for (let i = 0; i < this.stepElements.length; i++) {
            const el = this.stepElements[i]
            el.className = style.step
            if (i === this.currentIndex) {
                el.classList.add(style.stepActive)
            } else if (i < this.currentIndex) {
                el.classList.add(style.stepLeft)
            } else {
                el.classList.add(style.stepRight)
            }
        }

        this.errorEl = this.stepElements[this.currentIndex]?.querySelector(`.${style.errorMsg}`) as HTMLElement
        if (this.errorEl) this.errorEl.textContent = ""

        // Focus no input do step atual
        setTimeout(() => {
            const input = this.stepElements[this.currentIndex]?.querySelector("input, select, textarea") as HTMLElement
            if (input) input.focus()
        }, 400)
    }

    next() {
        const step = this.steps[this.currentIndex]
        const value = step.field.getValue ? step.field.getValue() : ""

        if (step.validate) {
            const error = step.validate(value)
            if (error) {
                if (this.errorEl) this.errorEl.textContent = error
                return
            }
        }

        if (this.currentIndex < this.steps.length - 1) {
            this.currentIndex++
            this.updateUI()
        } else {
            // Último step — chamar onComplete
            if (this.onCompleteCallback) {
                this.onCompleteCallback(this.getData())
            }
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--
            this.updateUI()
        }
    }

    getData(): { [key: string]: any } {
        const data: { [key: string]: any } = {}
        for (const step of this.steps) {
            if (step.field.key) {
                data[step.field.key] = step.field.getValue ? step.field.getValue() : ""
            }
        }
        return data
    }

    onComplete(callback: (data: { [key: string]: any }) => void) {
        this.onCompleteCallback = callback
        return this
    }

    remove() {
        this.element.remove()
    }
}
