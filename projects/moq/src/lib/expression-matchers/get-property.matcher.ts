import {GetPropertyInteraction} from "../interactions";
import {It} from "../expected-expressions/expression-predicates";
import {ExpectedGetPropertyExpression} from "../expected-expressions/expected-expressions";

/**
 * @hidden
 */
export class GetPropertyExpressionMatcher {

    public matched(left: GetPropertyInteraction, right: ExpectedGetPropertyExpression|It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as ExpectedGetPropertyExpression;
        if (left.name === rightExpression.name) return true;

        return false;
    }
}
