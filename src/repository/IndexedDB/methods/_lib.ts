import Method from ".";

export type Constructor<T = Method> = new (...args: any[]) => T;