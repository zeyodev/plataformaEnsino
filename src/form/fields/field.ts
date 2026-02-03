import Z, { Div, ZeyoAs } from "zeyo";

export default abstract class Field extends Div {
    private __label: ZeyoAs<"label">
    key: string
    isField = true
    toData = false
    constructor(key: string, toData?: boolean){
        super()
        this.key = key
        this.toData = toData === true
        this.children(
            this.__label = Z("label").attributes({"for": key}),
        )
    }

    label(text: string) {
        this.__label.text(text)
        return this
    }

    abstract getValue(): any
    abstract setValue(value: any): void
}