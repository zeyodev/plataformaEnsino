import { Childrens, Options, StateBaseConstructor } from "../../navigation/state";
import Usuario from "../usuario";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            /* [Usuario.path]: Usuario, */
        }
        options: Options = {}
    }
}