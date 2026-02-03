import Z, { Header, ZeyoAs } from "zeyo"

export default () => (new class HeaderBetween extends Header {
    title = Z("h1")
    slot = Z("div")
    constructor() {
        super();
        super.children(this.title, this.slot);
    }

    text(text: string): this {
        this.title.text(text);
        return this;
    }

    children(...child: Array<ZeyoAs<keyof HTMLElementTagNameMap> | string>): this {
        this.slot.children(...child);
        return this;
    }
}).class("d-flex", "jc-between", "w-100")