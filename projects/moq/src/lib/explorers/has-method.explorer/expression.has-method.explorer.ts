import { Expressions, NamedMethodExpression } from "../../reflector/expressions";

/**
 * @hidden
 */
export class ExpressionHasMethodExplorer {
    public has(name: PropertyKey, expression: Expressions<unknown>): boolean {
        if (expression instanceof NamedMethodExpression) {
            return expression.name === name;
        }

        return false;
    }
}
