import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";

export class JsonStringifyService implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return JSON.stringify;
    }
}
