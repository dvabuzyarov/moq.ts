import { Injectable } from "@angular/core";
import { getWorkspace } from "@angular/cli/utilities/config";
import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";

@Injectable()
export class GetWorkspace implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return getWorkspace;
    }
}
