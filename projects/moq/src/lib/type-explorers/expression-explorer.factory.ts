import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { ITypeExplorer } from "./type-explorer";
import { ExpressionExplorer } from "./expression-explorer";

export class ExpressionExplorerFactory {
    public get(expression: ExpectedExpressions<unknown>): ITypeExplorer {
        return new ExpressionExplorer(expression);
    }
}
