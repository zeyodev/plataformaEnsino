import { Constructor } from "../_lib";
import Many from "./many";
import One from "./one";

export default function Find<Base extends Constructor>(base: Base) {
    return class extends One(Many(base)) {

    }
}