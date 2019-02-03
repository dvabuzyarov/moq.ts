import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { ITypeExplorer } from "./preset";

export class ExpressionExplorerFactory {
    public get(expression: ExpectedExpressions<unknown>): ITypeExplorer {
        throw new Error("Not Implemented");
    }
}
