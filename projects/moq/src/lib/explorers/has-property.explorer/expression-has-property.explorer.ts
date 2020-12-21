import {
    Expressions,
    InOperatorExpression,
    MethodExpression,
    NamedMethodExpression
} from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";

/**
 * @hidden
 */
export class ExpressionHasPropertyExplorer {
    public has(name: PropertyKey, expression: Expressions<unknown>): boolean {
        if (expression instanceof It
            || expression instanceof MethodExpression
            || expression instanceof NamedMethodExpression
            || expression instanceof InOperatorExpression) {
            return false;
        }

        return expression.name === name;
    }
}
