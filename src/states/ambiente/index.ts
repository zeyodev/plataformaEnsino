import State from ".."
import OptionOrganizacoes from "../../options/organizacoes"
import Context from "../context"
import Z from "zeyo"
import TemplatePainel from "../../component1.1/templates/painel"
import MenuBar from "../../component1.1/atoms/menubar"
import Option from "../../options"
import Ambiente from "../../features/ambiente"
import OptionNicho from "../../options/gerenciarNicho"
import SideNavDinamico from "../../component1.1/organisms/sideNav/dinamico"
import FactoryOption from "../../options/factory"
import HeaderBetween from "../../component1.1/molecules/headerBetween"

export default class StateAmbiente extends State {
    name = "ambiente"
    children: { [key: string]: new () => State } = {}
    options = {
        organizacoes: OptionOrganizacoes,
    }
    slot = Z("div")
    header = new HeaderBetween()
    subhandle(option: Option) {
        this.slot.HTML("");
        this.slot.children(option.component.class("state-component"))
        this.header.slot.HTML("");
        option.setHeader(this.header);
    }
    
    constructor(private ambiente: Ambiente) {
        super()
    }

    handle(context: Context): void {
        context.app.root.innerHTML = ""
        context.app.root.appendChild(
            new TemplatePainel(context.app).object(o => {
                o.children(
                    Z("div").class(o.style.menu).children(
                        new SideNavDinamico(context.app, [
                            new OptionNicho(context.app, this.ambiente),
                        ], (option) => {
                            this.subhandle(option)
                        })
                        .class(o.style.navigation)
                        .object(async s => {
                            context.app.repository.createTriggerTo("Nichos", (value) => {
                                const [option, err] = FactoryOption.make(context.app, this.ambiente, value)
                                if (err) return 
                                s.update(option)
                            }, "create")

                            const [rawoptions, err] = await context.app.repository.findMany("Nichos", {ambiente: this.ambiente._id})
                            if (err) return 
                            const options: any = rawoptions.map((value, index) => {
                                const [option, err] = FactoryOption.make(context.app, this.ambiente, value)
                                if (err) return
                                return option
                            }).filter((option) => typeof option !== "undefined")

                            s.update(...options);
                            s.show(0)
                        }),
                        
                    ),
                    Z("div").class(o.style.main).object(main => {
                        main.children(
                            Z("div").class("d-flex", "gap-g", "p-10").children(
                                new MenuBar().click((m) => {
                                    o.element.classList.toggle(o.style.open)
                                    m.toggle()
                                }),
                                this.header,
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
    }

    prerequisite(context: Context): boolean {
        const token = localStorage.getItem("token")
        if (!token) return false;
        return true
    }
}