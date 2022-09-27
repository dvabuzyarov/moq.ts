import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";
import typescript, { SourceFile } from "typescript";

const {createPrinter, NewLineKind} = typescript;

@Injectable()
export class PrintSourceFileOperator implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return (sourceFile: SourceFile) => {
            const printer = createPrinter({newLine: NewLineKind.LineFeed, removeComments: false});
            return printer.printFile(sourceFile);
        };
    }
}
