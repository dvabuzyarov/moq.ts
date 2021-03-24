import { InOperatorInteraction } from "../interactions";
import { InOperatorExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class InOperatorExpressionMatcher {

    public matched(left: InOperatorInteraction, right: InOperatorExpression): boolean {
        return left.name === right.name;
    }
}
