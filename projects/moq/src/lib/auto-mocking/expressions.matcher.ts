import { Expressions } from "../reflector/expressions";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { It } from "../reflector/expression-predicates";

/**
 * @hidden
 */
export class ExpressionsMatcher {
    constructor(private readonly matcher: ExpressionMatcher) {
    }

    public matched<T>(left: Expressions<T>, right: Expressions<T>): boolean {
        if (left instanceof It || right instanceof It) {
            return false;
        }

        return this.matcher.matched(left, right);
    }
}
