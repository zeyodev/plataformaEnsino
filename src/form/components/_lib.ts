import { ZeyoAs } from "zeyo";

export interface FormElement <T extends keyof HTMLElementTagNameMap> {
    label: string
    placeholder: string
    element: ZeyoAs<T>
    type: string
}
export type FormElementContructor<F = FormElement<"input" | "select" | "button">> = new (...args: any[]) => F;
export type FormElementContructorAny<F = FormElement<any>> = new (...args: any[]) => F;