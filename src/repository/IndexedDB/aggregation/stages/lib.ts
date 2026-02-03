import Stage from "./stage";

export type Constructor<T = Stage> = new (...args: any[]) => T;