import { SetPropertyExpression } from "../reflector/expressions";
import { SetPropertyInteraction } from "../interactions";
import { It } from "../reflector/expression-predicates";
import { ConstantMatcher } from "./constant.matcher";

/**
 * @hidden
 */
export class SetPropertyExpressionMatcher {

    constructor(private constantMatcher: ConstantMatcher) {

    }

    public matched(left: SetPropertyInteraction, right: SetPropertyExpression | It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as SetPropertyExpression;
        if (left.name === rightExpression.name && this.constantMatcher.matched(left.value, rightExpression.value)) return true;

        return false;
    }
}
