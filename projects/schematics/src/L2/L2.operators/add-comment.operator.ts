import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";
import typescript, { ExportDeclaration } from "typescript";
const {addSyntheticLeadingComment, SyntaxKind} = typescript;

@Injectable()
export class AddCommentOperator implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return (comment: string) => (declarations: ExportDeclaration[]) => {
            addSyntheticLeadingComment(declarations[0], SyntaxKind.MultiLineCommentTrivia, comment, true);
            return declarations;
        };
    }
}
