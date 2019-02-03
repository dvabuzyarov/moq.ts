import { ITypeExplorer } from "./type-explorer";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";

export class ExpressionExplorer implements ITypeExplorer {
    constructor(private expression: ExpectedExpressions<unknown>) {

    }

    hasMethod(name: PropertyKey): boolean {
        return false;
    }

    hasProperty(name: PropertyKey): boolean {
        return false;
    }
}
