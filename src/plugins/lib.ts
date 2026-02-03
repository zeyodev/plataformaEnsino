/* Isso tera que ficar na biblioteca, pois sera a raiz do objeto App*/
export class Root {
    root: HTMLElement
    constructor(){
        this.root = document.querySelector("#root")!
    }
}
export type ZeyoAppConstructor<T = Root> = new (...args: any[]) => T;