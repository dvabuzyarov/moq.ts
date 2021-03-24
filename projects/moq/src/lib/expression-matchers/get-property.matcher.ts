import { GetPropertyInteraction } from "../interactions";
import { GetPropertyExpression } from "../reflector/expressions";
import { GetPropertyEqualityComparer } from "../expression.equality-comparers/get-property.equality-comparer";

/**
 * @hidden
 */
export class GetPropertyExpressionMatcher {

    constructor(private readonly getPropertyEqualityComparer: GetPropertyEqualityComparer) {
    }

    public matched(left: GetPropertyInteraction, right: GetPropertyExpression): boolean {
        return this.getPropertyEqualityComparer.equals(left, right);
    }
}
