import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";
import typescript from "typescript";

const {createSourceFile, ScriptTarget} = typescript;

@Injectable()
export class CreateEmptySourceFileOperator implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return (text: Buffer | string) => createSourceFile("file.ts", text.toString(), ScriptTarget.Latest);
    }
}
