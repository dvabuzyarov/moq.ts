import { NewOperatorInteraction } from "../interactions";
import { NewOperatorExpression } from "../reflector/expressions";
import { ArgumentsMatcher } from "./arguments.matcher";

/**
 * @hidden
 */
export class NewOperatorExpressionMatcher {

    constructor(private readonly argumentsMatcher: ArgumentsMatcher) {

    }

    public matched(left: NewOperatorInteraction, right: NewOperatorExpression): boolean {
        return this.argumentsMatcher.matched(left.args, right.args);
    }
}
