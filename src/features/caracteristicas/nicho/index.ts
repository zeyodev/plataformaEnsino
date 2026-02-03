import Z, { Div, ZeyoAs } from "zeyo";
import App from "../../../app";
import Caracteristica from "..";
import Nicho from "../../nicho";
import style from "./style.module.css"
import FormSelectSecao from "./form/select";
/* import Button from "../../../component1.1/atoms/buttons";
import Icon from "../../../component1.1/icons";
import StateModal from "../../../states/modal";
import Modal from "../../../component1.1/molecules/modal";
import { BasicStyleTypes } from "../../../component1.1/StyleTypes";
import FormFactoryUpdateForm from "../../formulario/form/factory/update";
import CardInfo from "../../../component1.1/molecules/cardInfo";
import TwoColumnsConfig from "../../../component1.1/molecules/twoColumnsConfig";
import Abas from "../../../component1.1/abas";
import Aba from "../../../component1.1/abas/aba"; */
import FactoryComponentesCaracteristicas from "../factory";
export default class ComponenteCaracteristicaNicho extends Div {
    constructor(private app: App, private caracteristica: Caracteristica, private item: any) {
        super();
        console.log(item)
        this.class("d-grid", "gap-g").children(
            Z("header").class("d-flex", "jc-between").children(
                Z("h2").text(caracteristica.titulo),
                Z("div").class("d-flex", "gap-m").children(
                    /* new Button("Criar").icon(new Icon("plus")).style("no-bg").style("p-s").click(async () => {
                        const [nicho]: [Nicho, boolean] = await this.app.repository.findOne("Nichos", { _id: caracteristica.alvo });
                        app.context.setState(new StateModal("selecionar", new Modal(this.app, new FormSelectSecao(app, nicho).setSubmitTrigger((alvo, err) => {
                            if (err) return
                            window.history.back();
                            window.history.back();
                            this.app.repository.create(this.caracteristica._id, {
                                caracteristica: caracteristica._id,
                                item: item._id,
                                alvo: alvo._id
                            })
                        }))));
                        app.context.handle();
                    }), */
                )
            ),
            Z("div").class("d-grid", "gap-m", style.itens).object(async (o) => {
                /* this.app.repository.createTriggerTo(this.caracteristica._id, (value) => {
                    if (value.caracteristica === caracteristica._id && value.item === item._id)
                        this.putobject(o, value);
                }, "create")
                const [alvos] = await this.app.repository.findMany(this.caracteristica._id, { caracteristica: caracteristica._id, item: item._id })
                alvos.forEach(relacionamento => {
                    this.putobject(o, relacionamento);
                }) */
            }),
        )
    }
    stylemap: { [key: string]: any/* keyof BasicStyleTypes */ } = {
        "undefined": "inverted",
        "inicial": "inverted",
        "final": "no-bg",
    }
    async putobject(o: any, relacionamento: any) {
        /* const [nicho]: [Nicho, boolean] = await this.app.repository.findOne("Nichos", { _id: this.caracteristica.alvo });
        const [value] = await this.app.repository.findOne(nicho.colecao, { _id: relacionamento.alvo })
        let [secao] = await this.app.repository.findOne("Secoes", { _id: value["secao"] });
        o.children(
            new CardInfo().setInfos(value).style(this.stylemap[secao.fase]).click(async (o) => {
                const [nicho]: [Nicho, boolean] = await this.app.repository.findOne("Nichos", { _id: secao.nicho })
                const [form] = await this.app.repository.findOne("Formularios", { nicho: nicho._id, tipo: "update" })
                this.app.context.setState(new StateModal("editar", new Modal(this.app, new TwoColumnsConfig(this.app,
                    new Abas(this.app).object(async (o) => {
                        const [abas, err] = await this.app.repository.findMany("Caracteristicas", { nicho: nicho._id });
                        if (err || !abas) return;
                        abas.forEach((aba, i) => o.push(new Aba(aba._id, aba.titulo, aba.icon,
                            FactoryComponentesCaracteristicas.make(this.app, aba, value), i === 0
                        )))
                    }),
                    new FormFactoryUpdateForm(this.app, form, value, nicho)
                        .setSubmitTrigger(async (data) => {
                            const [result] = await this.app.repository.findOne("Secoes", { _id: data["secao"] });
                            secao = result;
                            o.style(this.stylemap[secao.fase]);
                        })
                )
                )));
                this.app.context.handle();
            })
        ) */
    }
}