import { Expressions } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";
import { InOperatorExpression, FunctionExpression, MethodExpression } from "../../reflector/expressions";

/**
 * @hidden
 */
export class ExpressionHasPropertyExplorer {
    public has(name: PropertyKey, expression: Expressions<unknown>): boolean {
        if (expression instanceof It
            || expression instanceof FunctionExpression
            || expression instanceof MethodExpression
            || expression instanceof InOperatorExpression) {
            return false;
        }

        return expression.name === name;
    }
}
