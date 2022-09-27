import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import typescript from "typescript";

const {factory} = typescript;

export class CreateExportDeclarationOperator implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return (paths: string[]) => paths
            .map(path => factory.createExportDeclaration(
                undefined,
                false,
                undefined,
                factory.createStringLiteral(path)));
    }
}
