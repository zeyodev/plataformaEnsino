import App from "../../../app"
import CRUD from "../../../components/organisms/CRUD"
import FieldSelect from "../../../form/fields/select"
import FormCreateOpcao from "../../opcao/form/create"
import FormUpdateOpcao from "../../opcao/form/update"

export function getExtras(app: App, obj: any) {
    const extras: { [key: string]: any } = {
        "relation": new FieldSelect("pertence", true).object(async o => {
            const [colecoes] = await app.repository.findMany("Colecoes", {})
            colecoes.forEach(c => o.options({ value: c._id, name: c.nome }))
        }),
        "select": CRUD(app, "Opcoes", { create: "+ Adicionar" }, {
            create: new FormCreateOpcao(app, obj),
            read: { propriedade: obj._id },
            update: (app, obj) => new FormUpdateOpcao(app, obj)
        }, { nome: "string", valor: "string" })
    }
    return extras
}

export const tiposPropriedade = [
    { value: "string", name: "Texto" },
    { value: "date", name: "Data" },
    { value: "select", name: "Seleção" },
    { value: "relation", name: "Relacionamento" },
]