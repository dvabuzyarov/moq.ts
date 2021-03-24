import { ArgumentsMatcher } from "./arguments.matcher";
import { NamedMethodInteraction } from "../interactions";
import { NamedMethodExpression } from "../reflector/expressions";

/**
 * @hidden
 */
export class NamedMethodExpressionMatcher {

    constructor(private readonly argumentsMatcher: ArgumentsMatcher) {

    }

    public matched(left: NamedMethodInteraction, right: NamedMethodExpression): boolean {
        return left.name === right.name && this.argumentsMatcher.matched(left.args, right.args);
    }
}
