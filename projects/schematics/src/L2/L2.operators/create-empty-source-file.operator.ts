import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import typescript from "typescript";

const {createSourceFile, ScriptTarget} = typescript;

export class CreateEmptySourceFileOperator implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return (text: Buffer | string) => createSourceFile("file.ts", text.toString(), ScriptTarget.Latest);
    }
}
