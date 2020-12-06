import { UnaryFunction } from "./unary-function";
import { Injectable } from "@angular/core";
import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";

export function from<T, R>(input: T, fn: UnaryFunction<T, R>) {
    return fn(input);
}

@Injectable()
export class From implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return from;
    }
}
