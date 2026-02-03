import Build from "./build";

export default class Push extends Build{
    push(path: string) {
        //Aqui no objeto do state é bom colocar mais detalhes como a rota antiga, ex.: {current: path, back: window.location.pathname}
        window.history.pushState({ state: "" }, "", path)
        this.build(path)
    }
}
