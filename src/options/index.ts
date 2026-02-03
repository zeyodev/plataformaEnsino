import { ZeyoAs } from "zeyo";
/* import { SVGmap } from "../component1.1/icons/svgs/_list";
import Context from "../states/context";
import HeaderBetween from "../component1.1/molecules/headerBetween"; */

export default abstract class Option {
    constructor(public _id: string, public title: string, public icon: any/* keyof SVGmap */, public path: string) {}
    abstract component: ZeyoAs<"div"> | ZeyoAs<"section">;
    handle(context: any/* Context */) {
        const state= context.getState()
        if(!state.slot) return;
        state.slot.HTML("");
        state.slot.children(this.component)
    }
    setHeader(header: any/* HeaderBetween */) {
        header.text(this.title);
    }
}