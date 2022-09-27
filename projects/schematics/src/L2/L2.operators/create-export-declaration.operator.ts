import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";
import typescript from "typescript";

const {factory} = typescript;

@Injectable()
export class CreateExportDeclarationOperator implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return (paths: string[]) => paths
            .map(path => factory.createExportDeclaration(
                undefined,
                undefined,
                false,
                undefined,
                factory.createStringLiteral(path)));
    }
}
