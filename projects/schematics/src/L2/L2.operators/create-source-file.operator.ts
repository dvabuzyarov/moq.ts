import { InjectionFactory, TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";
import { ExportDeclaration, factory } from "typescript";
import { CreateEmptySourceFileOperator } from "./create-empty-source-file.operator";

@Injectable()
export class CreateSourceFileOperator implements InjectionFactory {
    constructor(private readonly sourceFileCreator: TypeOfInjectionFactory<CreateEmptySourceFileOperator>) {
        return this.factory() as any;
    }

    factory() {
        return (declarations: ExportDeclaration[]) => {
            const file = this.sourceFileCreator("");
            return factory.updateSourceFile(file, [...file.statements, ...declarations]);
        };
    }
}
