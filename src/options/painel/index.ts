import Z, { ZeyoAs } from "zeyo";
import Option from "..";
import App from "../../app";
import Button from "../../component1.1/atoms/buttons";
import Ambiente from "../../features/ambiente";
import Nicho from "../../features/nicho";
import HeaderBetween from "../../component1.1/molecules/headerBetween";
import StateModal from "../../states/modal";
import Modal from "../../component1.1/molecules/modal";
import Secao from "../../features/secao";
import Lista from "../../component1.1/molecules/lista";
import Snackbar from "../../component/snackbar";
import CardGrafico from "../../component1.1/molecules/cardGrafico";
import style from "./style.module.css"
import CardTop5 from "../../component1.1/molecules/carTop5";
import Input from "../../component1.1/atoms/inputs";

export default class OptionNichoPainel extends Option {
    constructor(private app: App, private ambiente: Ambiente, private option: Nicho) {
        super("painel", option.nome, option.icon, option.path)
        this.component.children(
            this.secoes
        )
    }
    gotError = false;

    component = Z("div").class("gap-g");
    secoes = Z("div").class("d-grid", "gap-g");
    setHeader(header: HeaderBetween): void {
        super.setHeader(header);
        header.children();

        this.app.repository.createTriggerTo("Secoes", (value, type, id) => {
            this.secoes.children(this.makeSecao(value))
        }, "create")

        this.secoes.HTML("").object(async o => {
            const [secoes, err] = await this.app.repository.findMany("Secoes", { "nicho": this.option._id })
            if (err || !secoes.length)
                return console.log("error", err, secoes);

            o.children(
                Z("div").class("d-grid", "gap-g", "ac-start").children(
                    Z("header").class("d-flex", "jc-between").children(
                        Z("h3").text("Painel"),
                    ),
                    Z("div").class("d-grid", "gap-g", "ac-start").children(
                        Z("div").children(
                            new Button("Ver Registros").click(async () => {
                                this.app.socket.emit("ouvir-registros", { organizacao: this.app.repository.idb.name })
                                this.app.context.setState(new StateModal("registros", Modal(this.app, Z("div").class(style.painel, "ac-start").object(async o => {
                                    this.app.socket.emit("uc/pegaregistros", { organizacao: this.app.repository.idb.name })
                                    const [result, err] = await this.app.socket.wait("uc/pegaregistros")
                                    if (err || !result) return console.error(`"error": ${err}, ${result}`);

                                    const registros: any[] = result.filter((r: any) => new Date(r.date).getDate() === new Date().getDate());
                                    let inicio: Input, fim: Input;
                                    const change = ()=> {
                                        const ivalue = new Date(inicio.element.value.replace("-", " ")).getTime()
                                        const fvalue = new Date(fim.element.value.replace("-", " ")).getTime()
                                        if (ivalue > fvalue || isNaN(ivalue) || isNaN(fvalue)) return;
                                        const filtrados: any[] = result.filter((r: any) => {
                                            const rvalue = new Date(r.date).getTime()
                                            return rvalue > ivalue && rvalue < fvalue 
                                        });
                                        o.childList.forEach((c: any) => {
                                            if (c.setData) return c.setData(filtrados.filter(r => r.origem === "acesso"), new Date(inicio.element.value.replace("-", " ")), new Date(fim.element.value.replace("-", " ")))
                                            if (!c.push) return
                                            c.itens = {}
                                            for (const filtrado of filtrados) {
                                                if (filtrado.origem !== c.type) continue;
                                                c.push(filtrado.query.item);
                                            }
                                            c.update();
                                        })
                                    }
                                    o.children(
                                        //fazer opcoes para hora dia semana mes
                                        Z("div").class("d-grid", "gap-g", "ac-start").children(
                                            Z("h3").text("Início"),
                                            inicio = new Input().set("type", "date").on("change", change),
                                            Z("h3").text("Fim"),
                                            fim = new Input().set("type", "date").on("change", change)
                                        ),
                                        new CardGrafico("line", "Acessos").setData(registros.filter(r => r.origem === "acesso")),
                                        new CardTop5(this.app, "Top 5 mais Pedidos", "pedir").object(o => {
                                            for (const registro of registros) {
                                                if (registro.origem !== o.type) continue;
                                                o.push(registro.query.item);
                                            }
                                            o.update();
                                        }),
                                        new CardTop5(this.app, "Top 5 mais Clicados", "modalproduto").object(o => {
                                            for (const registro of registros) {
                                                if (registro.origem !== o.type) continue;
                                                o.push(registro.query.item);
                                            }
                                            o.update();
                                        }),
                                        Z("h3").text("mostrar jornada dos usuarios que clicaram em pedir"),
                                    )
                                }))))
                                this.app.context.handle()
                            })
                        ),
                        Z("div").children(
                            new Button("Gerar Aplicativo").click(async () => {
                                this.app.socket.emit("uc/gerar-aplicativo", { organizacao: this.app.repository.idb.name })
                                Snackbar(this.app, "Gerando aplicativo...")
                                const [result, err] = await this.app.socket.wait("uc/gerar-aplicativo")
                                if (err || !result) return Snackbar(this.app, "Erro ao gerar aplicativo");
                                Snackbar(this.app, "Aplicativo gerado com sucesso");
                            })
                        ),
                    )
                )
                //...secoes.map((value, index) => this.makeSecao(value))
            )
        })
    }

    makeSecao(secao: Secao): ZeyoAs<"div"> {
        return new Lista(this.app, secao, this.option)
    }
}