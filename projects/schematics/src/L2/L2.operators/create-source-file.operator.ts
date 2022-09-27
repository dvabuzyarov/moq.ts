import { InjectionFactory, TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";
import { CreateEmptySourceFileOperator } from "./create-empty-source-file.operator";
import typescript, { ExportDeclaration } from "typescript";

const {factory} = typescript;

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
