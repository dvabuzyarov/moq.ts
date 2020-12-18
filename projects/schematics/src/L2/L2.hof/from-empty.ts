import { UnaryFunction } from "./unary-function";
import { Injectable } from "@angular/core";
import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";

export function fromEmpty<R>(fn: UnaryFunction<never, R>) {
    return fn();
}

@Injectable()
export class FromEmpty implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return fromEmpty;
    }
}
