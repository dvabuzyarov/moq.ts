import { ExpectedExpressions, ExpectedMethodExpression } from "../../expected-expressions/expected-expressions";
import { It } from "../../expected-expressions/expression-predicates";

/**
 * @hidden
 */
export class ExpressionHasPropertyExplorer {
    public has(name: PropertyKey, expression: ExpectedExpressions<unknown>): boolean {
        if (expression instanceof It || expression instanceof ExpectedMethodExpression) {
            return false;
        }

        return expression.name === name;
    }
}
