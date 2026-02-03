import { div } from "zeyo";
import App from "../../../app";
import TemplatePainel from "../../molecules/painel";
import headerBetween from "../../molecules/headerBetween";
import Option from "../../../options";
import dinamico from "../sideNav/dinamico";
import addoptions from "../../../options/addoptions";
import menubar from "../../atoms/menubar";
import Modal from "../../../states/Modal";
import modal from "../../molecules/modal";
//import FormSelectTipos from "../../../features/nicho/form/selectTipo";
import FactoryComponente from "../../templates/factory";

export default (app: App) => (new class extends TemplatePainel {
    slot = div()
    header = headerBetween()
    async subhandle(option: Option) {
        /* if(option.path === "addOption")
            return app.context.setState(Modal("create", modal(app, new FormSelectTipos(app, {})))).handle() */
        this.slot.HTML("");
        console.log(option)
        //aqui vai ter que pegar o componente pertence e montar no slot
        const [component, err] = await app.repository.findOne("Componentes", {pertence: option._id})
        if(err || !component) return
        const componente = new FactoryComponente().make(app, component)
        if(!componente) return
        this.slot.children(componente.class("state-component"))
        this.header.slot.HTML("");
        (componente as any).setHeader(this.header);
    }
}).object(o => o.children(
    div(
        dinamico(app, [
            addoptions(app)
        ], o.subhandle.bind(o))
            .class(o.style.navigation)
            .object(async d => {
                app.repository.createTriggerTo("Opcoes", option => d.update(option), "create")
                const [options] = await app.repository.findMany("Opcoes", {})
                console.log(options)
                options.forEach(opt => {
                    if(!opt.colecao) return
                    d.update(opt)
                })
            })
    ).class(o.style.menu),
    div(
        div(
            menubar().click((m) => {
                o.element.classList.toggle(o.style.open)
                m.toggle()
            }),
            o.header
        ).class("d-flex", "gap-g", "p-10"),
        o.slot.class(o.style.dash)
    ).class(o.style.main)
))