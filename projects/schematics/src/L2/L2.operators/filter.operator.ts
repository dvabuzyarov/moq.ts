import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";

@Injectable()
export class FilterOperator implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return (regex: RegExp) => (input: string[]) => input.filter(i => regex.test(i));
    }
}
