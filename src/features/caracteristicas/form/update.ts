import App from "../../../app";
//import Button from "../../../component1.1/atoms/buttons";
import Form from "../../../form"
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";
import Nicho from "../../nicho";
import Caracteristicas from "./list";

export default class FormUpdateCaracteristica extends Form {
    constructor(private app: App, private caracteristica: any, private nicho: Nicho) {
        super();
        this.title.text(caracteristica.titulo);
        this.body.children(
            new FieldInput("titulo", true).label("Título").setValue(caracteristica.titulo),
            new FieldInput("icon", true).label("Icone").setValue(caracteristica.icon),
            new FieldSelect("tipo", true).label("Tipo").options(...Caracteristicas.list).setValue(caracteristica.tipo),
            // TODO: aqui se o tipo for item ou nicho entao tem que pegar o qual nicho, se for habilidade então tem que pegar a habilidade
            (() => {
                if (caracteristica.tipo === "item" || caracteristica.tipo === "nicho")
                    return new FieldSelect("alvo", true).label("Nicho").object(async o => {
                        /* const [nichos] = await this.app.repository.findMany("Nichos", { ambiente: nicho.ambiente });
                        o.options(...nichos.map((n) => ({ value: n._id, name: n.nome }))); */
                    }).setValue(caracteristica.alvo);

                if (caracteristica.tipo === "habilidade")
                    return new FieldSelect("alvo", true).label("Habilidade").object(async o => {
                        /* const [habilidades] = await this.app.repository.findMany("Habilidades", { ambiente: nicho.ambiente });
                        o.options(...habilidades.map((n) => ({ value: n._id, name: n.titulo }))); */
                        o.options(
                            { value: "canva", name: "Canva" },
                            { value: "chat", name: "Chat" },
                        );
                    }).setValue(caracteristica.alvo).object(o => {
                        o.element.onchange = () => { this.onHabilidadeChange(o.getValue()) }
                    })

                if (caracteristica.tipo === "inverso")
                    return new FieldSelect("alvo", true).label("Caracteristica").object(async o => {
                        /* const [nichos] = await this.app.repository.findMany("Caracteristicas", { });
                        o.options(...nichos.map((n) => ({ value: n._id, name: n.titulo }))); */
                    }).setValue(caracteristica.alvo);
                return new FieldInput("alvo", true).label("Alvo")
            })(),

        )
        this.footer.children(
            //new Button().text("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        //await this.app.repository.update("Caracteristicas", this.caracteristica._id, data);
        window.history.back();
    }

    onHabilidadeChange(habilidade: string) {
        if (habilidade === "chat") {
            this.body.children(
                new FieldSelect("relacionamento", true).label("Caracteristica com Contato").object(async o => {
                    /* const [caracteristicas] = await this.app.repository.findMany("Caracteristicas", { nicho: this.nicho._id });
                    o.options(...caracteristicas.map((n) => ({ value: n._id, name: n.titulo }))); */
                }).setValue(this.caracteristica.relacionamento),
            )
        }/*  else if (habilidade === "canva") {
            this.body.children(
                new FieldSelect("alvo", true).label("Nicho").object(async o => {
                    const [nichos] = await this.app.repository.findMany("Nichos", { ambiente: this.caracteristica.ambiente });
                    o.options(...nichos.map((n)  => ({ value: n._id, name: n.nome })));
                }).setValue(this.caracteristica.alvo),
            )
        } */
    }
}