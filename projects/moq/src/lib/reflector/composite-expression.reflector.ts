import { Expressions } from "./expressions";
import { ExpressionReflector, IExpression } from "./expression-reflector";
import { AsyncExpressionDetector } from "./async-expression.detector";
import { AsyncExpressionReflector } from "./async-expression.reflector";
import { SyncExpressionReflector } from "./sync-expression.reflector";

/**
 * This class reflects an expression to an expression tree representation.
 * async/await expressions are reflected in shellow mode.
 *
 * For more examples check
 * [unit tests for this class]
 * (https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/lib/reflector/full.expression-reflector.spec.ts)
 */
export class CompositeExpressionReflector implements ExpressionReflector {
    constructor(
        private readonly asyncExpressionDetector: AsyncExpressionDetector,
        private readonly syncExpressionReflector: SyncExpressionReflector,
        private readonly asyncExpressionReflector: AsyncExpressionReflector) {
    }

    /**
     * Reflects the provided code as an expression tree.
     */
    public reflect<T>(expression: IExpression<T>): Expressions<T>[] {
        return this.asyncExpressionDetector.isAsync(expression)
            ? this.asyncExpressionReflector.reflect(expression)
            : this.syncExpressionReflector.reflect(expression);
    }
}
