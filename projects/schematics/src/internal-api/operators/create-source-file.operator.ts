import { InjectionFactory, typeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";
import { ExportDeclaration, updateSourceFileNode } from "typescript";
import { SourceFileCreator } from "../source-file.creator";

@Injectable()
export class CreateSourceFileOperator implements InjectionFactory {
    constructor(private readonly sourceFileCreator: typeOfInjectionFactory<SourceFileCreator>) {
        return this.factory() as any;
    }

    factory() {
        return (declarations: ExportDeclaration[]) => {
            const file = this.sourceFileCreator("");
            return updateSourceFileNode(file, [...file.statements, ...declarations]);
        };
    }
}
