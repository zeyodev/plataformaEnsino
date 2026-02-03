import Modal from "../../../modal";
import { FormElementContructorAny } from "../_lib";
export default function Action<Base extends FormElementContructorAny>(base: Base) {
    return class extends base {
        action(o: any) {
            Modal.push(o);
        }
    }
}