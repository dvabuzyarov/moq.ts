import { InOperatorInteraction } from "../interactions";
import { It } from "../expected-expressions/expression-predicates";
import { ExpectedInOperatorExpression } from "../expected-expressions/expected-expressions";

/**
 * @hidden
 */
export class InOperatorMatcher {

    public matched(left: InOperatorInteraction, right: ExpectedInOperatorExpression | It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as ExpectedInOperatorExpression;
        if (left.name === rightExpression.name) return true;

        return false;
    }
}
