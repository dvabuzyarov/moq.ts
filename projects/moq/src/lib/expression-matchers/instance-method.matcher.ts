import { ArgumentsMatcher } from "./arguments.matcher";
import { NamedMethodInteraction } from "../interactions";
import { NamedMethodExpression } from "../reflector/expressions";
import { It } from "../reflector/expression-predicates";

/**
 * @hidden
 */
export class NamedMethodExpressionMatcher {

    constructor(private argumentsMatcher: ArgumentsMatcher) {

    }

    public matched(left: NamedMethodInteraction, right: NamedMethodExpression | It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as NamedMethodExpression;
        if (left.name === rightExpression.name) {
            return this.argumentsMatcher.matched(left.args, rightExpression.args);
        }

        return false;
    }
}
