import {GetPropertyInteraction} from "../interactions";
import {It} from "../reflector/expression-predicates";
import {GetPropertyExpression} from "../reflector/expressions";

/**
 * @hidden
 */
export class GetPropertyExpressionMatcher {

    public matched(left: GetPropertyInteraction, right: GetPropertyExpression|It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as GetPropertyExpression;
        if (left.name === rightExpression.name) return true;

        return false;
    }
}
