import { object, Zeyo } from "zeyo";
import { IconMapping } from "../../../atoms/icons";

export default class Aba {
    value: string
    titulo: string;
    icon: any;
    componente: Zeyo;
    selected = false
    needToCreate = false
    constructor(value: string, titulo: string, icon: keyof IconMapping, componente: Zeyo, selected?: boolean) {
        this.value = value
        this.titulo = titulo
        this.icon = icon
        this.componente = componente
        this.selected = selected ? true : false
    }

    object(cb: (o: this) => void) {
        cb(this)
        return this
    }
}