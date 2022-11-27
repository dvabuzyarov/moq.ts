import { UnaryFunction } from "./unary-function";
import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";

export function fromEmpty<R>(fn: UnaryFunction<never, R>) {
    return fn();
}

export class FromEmpty implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return fromEmpty;
    }
}
