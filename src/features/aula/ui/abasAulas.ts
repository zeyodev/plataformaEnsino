import { div } from "zeyo";
import App from "../../../app";
import Abas from "../../../components/organisms/abas";
import Aba from "../../../components/organisms/abas/aba";
import CRUD from "../../../components/organisms/CRUD";
import modal from "../../../components/molecules/modal";
import Modal from "../../../states/Modal";
import FormCreateAula from "../form/create";
import aulaComponent from "./crudComponent";
import configuracaoAula from "./configuracao";
import FormCreateCategoriaAula from "../../categoria-aula/form/create";

function buildAulaCrud(app: App, categoria?: string) {
    return div().class("d-grid", "gap-g", "p-10").object(o => {
        o.children(CRUD(app, "Aulas", { create: "Criar Aula" }, {
            create: new FormCreateAula(app, categoria),
            read: categoria ? { categoria } : { categoria: { $exists: false } },
            update: (a, obj) => configuracaoAula(a, obj)
        }, aulaComponent))
    })
}

export default (app: App) => div().class("d-grid", "gap-g").object(o => {
    const abasAulas = new Abas(app)

    abasAulas.push(new Aba("sem-categoria", "Sem Categoria", "iconInbox",
        buildAulaCrud(app), true
    ))

    app.repository.findMany("CategoriasAulas", {}).then(([categorias, err]) => {
        if (err) return
        for (const cat of categorias) {
            abasAulas.push(new Aba(cat.value, cat.titulo, cat.icon || "iconFolder",
                buildAulaCrud(app, cat._id)
            ))
        }

        abasAulas.push(new Aba("add-categoria", "+", "iconPlus",
            div()
        ))

        abasAulas.tabs.element.lastElementChild?.addEventListener("click", (e) => {
            e.stopPropagation()
            const form = new FormCreateCategoriaAula(app)
            form.setSubmitTrigger((data) => {
                window.history.back()
                if (!data) return
                app.repository.findMany("CategoriasAulas", { value: data.value }).then(([cats]) => {
                    const cat = cats[cats.length - 1]
                    if (!cat) return
                    const addTab = abasAulas.tabs.element.lastElementChild
                    const addSlide = abasAulas.display.element.lastElementChild

                    abasAulas.push(new Aba(cat.value, cat.titulo, cat.icon || "iconFolder",
                        buildAulaCrud(app, cat._id)
                    ))

                    const newTab = abasAulas.tabs.element.lastElementChild
                    const newSlide = abasAulas.display.element.lastElementChild
                    if (addTab && newTab) abasAulas.tabs.element.insertBefore(newTab, addTab)
                    if (addSlide && newSlide) abasAulas.display.element.insertBefore(newSlide, addSlide)

                    abasAulas.changeSlide(abasAulas.element, cat.value)
                })
            })
            app.context.setState(Modal("create-categoria-aula", modal(app, form)))
            app.context.handle()
        })
    })

    o.children(abasAulas)
})
