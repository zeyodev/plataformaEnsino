import Z, { Zeyo } from "zeyo";
import App from "../../app";
import { StateBaseConstructor } from "../../navigation/state";
import Abas from "../../component/abas";
import AbaEventos from "./abas/eventos";
import AbaLembretes from "./abas/lembretes";
import AbaClientes from "./abas/clients";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App): Promise<Zeyo> {
            return (new Abas(app)
            .push(new AbaClientes(app).setSelected())
            .push(new AbaEventos(app))
            .push(new AbaLembretes(app))
            .create()).class("state-component")
        }
    }
}