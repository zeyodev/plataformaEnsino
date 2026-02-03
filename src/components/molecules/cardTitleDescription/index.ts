import Z, { h3, p, ZeyoAs } from "zeyo";
import Card from "../../atoms/card";


export default () => (new class extends Card {
    title = h3();
    description = p();

    setInfo(title: string, description: string) {
        this.title.text(title);
        this.description.text(description);
        return this;
    }
})