import { SetPropertyExpression } from "../reflector/expressions";
import { SetPropertyInteraction } from "../interactions";
import { ConstantMatcher } from "./constant.matcher";

/**
 * @hidden
 */
export class SetPropertyExpressionMatcher {

    constructor(private readonly constantMatcher: ConstantMatcher) {

    }

    public matched(left: SetPropertyInteraction, right: SetPropertyExpression): boolean {
        return left.name === right.name && this.constantMatcher.matched(left.value, right.value);
    }
}
