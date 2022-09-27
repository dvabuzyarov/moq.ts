import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import typescript, { ExportDeclaration } from "typescript";

const {addSyntheticLeadingComment, SyntaxKind} = typescript;

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
