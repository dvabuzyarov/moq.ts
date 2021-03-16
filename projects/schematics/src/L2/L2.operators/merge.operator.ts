import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";

@Injectable()
export class MergeOperator implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return <I>(...sources: I[][]) => (input: I[]) => sources.reduce((p, c) => [...p, ...c], input);
    }
}
