import { Expressions } from "../../reflector/expressions";
import { MethodExpression } from "../../reflector/expressions";

/**
 * @hidden
 */
export class ExpressionHasMethodExplorer {
    public has(name: PropertyKey, expression: Expressions<unknown>): boolean {
        if (expression instanceof MethodExpression) {
            return expression.name === name;
        }

        return false;
    }
}
