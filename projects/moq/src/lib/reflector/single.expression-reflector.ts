import { Expressions } from "./expressions";
import { FullExpressionReflector } from "./full.expression-reflector";
import { ExpressionReflector, IExpression } from "./expression-reflector";

/**
 * This class reflects an expression to the first expression representation.
 *
 */
export class SingleExpressionReflector implements ExpressionReflector {
    constructor(private readonly reflector: FullExpressionReflector) {
    }

    /**
     * Reflects the provided code as an expression tree.
     *
     * @returns The first expression
     */
    public reflect<T>(expression: IExpression<T>): Expressions<T>[] {
        const [first] = this.reflector.reflect(expression);
        return [first];
    }
}
