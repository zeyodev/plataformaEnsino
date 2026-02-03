import State from ".."
import OptionOrganizacoes from "../../options/organizacoes"
import Context from "../context"
import Z, { div, option } from "zeyo"
import SideNav from "../../component1.1/organisms/sideNav"
import OptionAmbientes from "../../options/ambientes"
import TemplatePainel from "../../component1.1/templates/painel"
import MenuBar from "../../component1.1/atoms/menubar"
import Option from "../../options"
import Organizacao from "../../features/organizacao"
import Ambiente from "../../features/ambiente"
import StateAmbiente from "../ambiente"
import button from "../../component1.1/atoms/button"
import iconSettings from "icons/src/business_and_online_icons/iconSettings"
import StateConfiguracao from "../config"
import dinamico from "../../components/organisms/sideNav/dinamico"
import addoptions from "../../options/addoptions"
import Modal from "../Modal"
import modal from "../../components/molecules/modal"
import FormSelectTipos from "../../features/nicho/form/selectTipo"
import FactoryComponente from "../../components/templates/factory"

export default class StateOrganizacao extends State {
    name = "organizacao"
    children: { [key: string]: new () => State } = {}
    options = {
        organizacoes: OptionOrganizacoes,
    }
    slot = Z("div")
    title = Z("h1")
    async subhandle(context: Context, option: Option) {
        if(option.path === "addOption")
            return context.setState(Modal("create", modal(context.app, new FormSelectTipos(context.app, {})))).handle()

        this.slot.HTML("");
        console.log(option)
        //aqui vai ter que pegar o componente pertence e montar no slot
        const [component, err] = await context.app.repository.findOne("Componentes", {pertence: option._id})
        if(err || !component) return
        const componente = new FactoryComponente().make(context.app, component)
        if(!componente) return
        this.slot.children(componente.class("state-component"))
        /* this.header.slot.HTML("");
        (componente as any).setHeader(this.header); */
    }
    
    constructor(private organizacao: Organizacao) {
        super()
    }

    handle(context: Context): void {
        context.app.root.innerHTML = ""
        context.app.root.appendChild(
            new TemplatePainel(context.app).object(o => {
                o.children(
                    div(
                        dinamico(context.app, [addoptions(context.app)], this.subhandle.bind(this, context))
                        .class(o.style.navigation)
                        .object(async d => {
                            context.app.repository.createTriggerTo("Opcoes", option => d.update(option), "create")
                            const [options] = await context.app.repository.findMany("Opcoes", {}) //TODO: aqui tem que pegar os que sao do root
                            console.log(options)
                            options.forEach(opt => {
                                if(!opt.colecao) return
                                d.update(opt)
                            })
                        }),
                        button().class(o.style.config).icon(iconSettings()).style("no-bg").click(() => context.action("config", this.organizacao))
                    ).class(o.style.menu),
                    Z("div").class(o.style.main).object(main => {
                        main.children(
                            Z("div").class("d-flex", "gap-g", "p-10").children(
                                new MenuBar().click((m) => {
                                    o.element.classList.toggle(o.style.open)
                                    m.toggle()
                                }),
                                this.title,
                            ),
                            this.slot.class(o.style.dash)
                        )
                    }),
                )
            }).element
        )
    }

    commands = {
        "ambiente": (context: Context, ambiente: Ambiente) => {
            context.setState(new StateAmbiente(ambiente))
            context.handle()
        },
        "config": (context: Context, ambiente: any) => {
            context.setState(new StateConfiguracao(ambiente))
            context.handle()
        }
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("token")
        if (!token) return false;
        return true
    }
}