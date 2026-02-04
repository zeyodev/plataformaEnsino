
import { FormElementContructorAny } from "../_lib";
export default function Action<Base extends FormElementContructorAny>(base: Base) {
    return class extends base {
        action(o: any) {
            //Modal.push(o);
            throw new Error("aqui tem que refazer o modal para esse caso de modais encadeados caso seja ainda necessário");
            
        }
    }
}