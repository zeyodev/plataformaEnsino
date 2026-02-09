import { IZeyo } from "zeyo/src/zeyo";

export default (component: () => IZeyo<keyof HTMLElementTagNameMap>, map: {[key: string]: string}, ...documents: any[]) => {
    return documents.map(d => component().object((o: any) => {
        for (const key in map) {
            if (!o[key]) continue;
            o[key](d[map[key]])
        }
    }))
}