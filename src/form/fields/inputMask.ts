import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import Input from "../atoms/inputs";

export default class FieldInputMask extends Field {
    __input: ZeyoAs<"input">
    type: keyof typeof this.masks = ""
    masks: {[key: string]: {mask: string}} = {
        whatsapp: { mask: "(99) 9999-9999" },
        sms: { mask: "+99 (99) 9 9999-9999" },
        code: { mask: "9-9-9-9" },
        cpf: { mask: "999.999.999-99" }
    };
    constructor(key: string, toData?: boolean) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            this.__input = new Input().set("id", key)
        )
    }

    putMask(type: keyof typeof this.masks) {
        this.type = type;
        this.__input.element.placeholder = this.masks[type].mask;
        this.__input.element.setAttribute("maxlength", this.masks[type].mask.length.toString());
        this.__input.element.onkeydown = (e) => {
            if (
                this.__input.element.value.length < this.masks[type].mask.length &&
                !(e.key === "Backspace" || e.key === "Delete")
            ) {
                while (isNaN(parseInt(this.masks[type].mask[this.__input.element.value.length])))
                    this.__input.element.value += this.masks[type].mask[this.__input.element.value.length];
            }
        };
    }

    removeMask() {
        let value = this.__input.element.value;
        const result = Array.from(
            new Set(this.masks[this.type].mask.replace(/\d+/g, ""))
        );
        result.forEach(
            (c) => (value = value.replace(new RegExp("\\" + c, "g"), ``))
        );
        return value;
    }

    mask(mask: keyof typeof this.masks, value?: string | number) {
        this.putMask(mask);
        return this
    }

    setType(type: string) {
        this.__input.set("type", type)
        return this
    }

    getValue(): string {
        return this.removeMask();
    }

    setValue(value: string) {
        if(!value || value === "") return this
        let i = 0;
        this.masks[this.type].mask.split("").forEach((c) => {
            if (!isNaN(parseInt(c)))
                this.__input.element.value += value[i++];
            else this.__input.element.value += c;
        });
            
        return this
    }
}