import { Expressions } from "../reflector/expressions";
import { Interaction } from "../interactions";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";

/**
 * @hidden
 */
export class CallCounter {

    constructor(private expressionMatcher: ExpressionMatcher) {

    }

    public count<T>(expected: Expressions<T>, expressions: Interaction[]): number {
        let count = 0;
        for (const expression of expressions) {
            if (this.expressionMatcher.matched(expression, expected) === true) {
                count += 1;
            }
        }

        return count;
    }
}
