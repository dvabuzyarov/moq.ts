import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { getWorkspace } from "@angular/cli/src/utilities/config.js";

export class GetWorkspace implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return getWorkspace;
    }
}
