import { Expressions } from "../reflector/expressions";
import { Tracker } from "../tracker/tracker";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

/**
 * @hidden
 */
export class CallCounter {

    constructor(
        private readonly comparer: ExpressionEqualityComparer,
        private readonly tracker: Tracker) {

    }

    public count<T>(expected: Expressions<T>): number {
        let count = 0;
        for (const expression of this.tracker.interactions()) {
            if (this.comparer.equals(expression, expected) === true) {
                count += 1;
            }
        }

        return count;
    }
}
