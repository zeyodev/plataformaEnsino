import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import Input from "../atoms/inputs";
import App from "../../app";

export default class FieldSelectPertencimento extends Field {
    __input: ZeyoAs<"select">
    making = false
    constructor(key: string, toData?: boolean, private app?: App, form?: any, private campo?: any) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            this.__input = Z("select").class(Input.style).set("id", key)
        )
        if(app && campo) 
            this.makeOptions(app, campo)
            // TODO: incluir botao criar documento da colecao ao qual irá pertencer e para o objeto
            //  tem que passar o objeto relacional do formulario para o outro formulario
    }
    //TODO: pertence poder ser auto completado quando o objeto passado por parametro é de uma colecao naqual o objeto a ser criado possui relacionamento
    async makeOptions(app: App, campo: any) {
        this.making = true
        console.log("Select Pertence Campo", campo)
        const [propriedade] = await app.repository.findOne("Propriedades", {_id: campo.propriedade})
        console.log("Select Pertence Propriedade", propriedade)
        const [colecao] = await app.repository.findOne("Colecoes", {_id: propriedade.pertence})
        console.log("Select Pertence Colecao", colecao)
        if(!colecao) return
        const [documentos] = await app.repository.findMany(colecao.nome, campo.query || {})
        console.log("Select Pertence Documentos", documentos)
        // TODO seria bom criar algum tipo de propriedade show para ser a propriedade que contem o valor param mostrar, dai poderia usar aqui em vez do nome
        this.clear().options(...documentos.map(d => ({value: d._id, name: d.nome || d.data})))
        this.making = false
    }

    clear() {
        this.__input.HTML("")
        return this
    }

    options(...options: { value: string, name: string }[]) {
        this.__input.children(
            ...options.map(({ name, value }) => Z("option").set("value", value).text(name))
        )
        return this
    }

    getValue(): string {
        return this.__input.element.value
    }

    getName(): string | null{
        console.log(this.__input.element.selectedOptions)
        return this.__input.element.options[this.__input.element.selectedIndex].getAttribute("name")
    }

    async setValue(value: any) {
        console.log("===> Select:", value, this.__input.element)
        console.log("===> Making:", this.making)

        while (this.making) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        this.__input.element.value = value
        return this
    }
}