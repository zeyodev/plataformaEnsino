import { Zeyo } from "zeyo"
import App from "../../app"


interface OptionsState {
    type: "state"
    title: string
    next: StateConstructor
}
interface OptionsRoute {
    type: "route"
    title: string
    route: string
    param: object
}
export interface OptionsMap {
    "state": OptionsState
    "route": OptionsRoute
}

export type StateOptions = Array<OptionsState | OptionsRoute>
export interface State {
    childrens: Childrens;
    options: any[];
    setParametros(route: string[]): string[]
    previous?: State
    forward?: State
    parametros: {[key: string]: string}
    page?: any
    setComponente(app: App): Promise<Zeyo>
    setup(): Promise<void>
    name: string
    title: string
}
export type StateConstructor<S = State> = new (app: App) => S

export type StateBaseConstructor<S = StateBase> = new (...params: any[]) => S
export interface Option {
    title: string;
    next: StateConstructor;
    param?: string[];
}
export type Childrens = {[key: string]: StateConstructor}
export type Options = {[key: string]: Option}
export class StateBase {
    childrens: Childrens = {}
    parametros: {[key: string]: string} = {}
}