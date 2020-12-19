import { InOperatorInteraction } from "../interactions";
import { It } from "../reflector/expression-predicates";
import { InOperatorExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class InOperatorExpressionMatcher {

    public matched(left: InOperatorInteraction, right: InOperatorExpression | It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as InOperatorExpression;
        if (left.name === rightExpression.name) return true;

        return false;
    }
}
