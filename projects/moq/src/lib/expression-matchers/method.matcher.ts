import { ArgumentsMatcher } from "./arguments.matcher";
import { MethodInteraction } from "../interactions";
import { MethodExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class MethodExpressionMatcher {

    constructor(private readonly argumentsMatcher: ArgumentsMatcher) {

    }

    public matched(left: MethodInteraction, right: MethodExpression): boolean {
        return this.argumentsMatcher.matched(left.args, right.args);
    }
}
