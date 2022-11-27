import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { join } from "path";

export class JoinPath implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return join;
    }
}
