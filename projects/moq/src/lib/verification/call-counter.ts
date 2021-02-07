import { Expressions } from "../reflector/expressions";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { Tracker } from "../tracker/tracker";

/**
 * @hidden
 */
export class CallCounter {

    constructor(
        private readonly expressionMatcher: ExpressionMatcher,
        private readonly tracker: Tracker) {

    }

    public count<T>(expected: Expressions<T>): number {
        let count = 0;
        for (const expression of this.tracker.interactions()) {
            if (this.expressionMatcher.matched(expression, expected) === true) {
                count += 1;
            }
        }

        return count;
    }
}
