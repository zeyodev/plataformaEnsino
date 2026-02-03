import { ZeyoAs } from "zeyo";


export default abstract class State {
    abstract handle(context: any): void;
    abstract prerequisite(context: any): boolean
    abstract commands: {[key: string]: (...params: any[]) => void };
    abstract name: string;
    abstract children: {[key: string]: new () => State};
    previousState?: State;
    nextState?: State;
    slot?: ZeyoAs<"div">;
    remove?(): void;
    action(action: string, ...params: any[]) {
        this.commands[action](...params);
    };
}