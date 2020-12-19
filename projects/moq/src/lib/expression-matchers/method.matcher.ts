import { ArgumentsMatcher } from "./arguments.matcher";
import { MethodInteraction } from "../interactions";
import { MethodExpression } from "../reflector/expressions";
import { It } from "../reflector/expression-predicates";

/**
 * @hidden
 */
export class MethodExpressionMatcher {

    constructor(private argumentsMatcher: ArgumentsMatcher) {

    }

    public matched(left: MethodInteraction, right: MethodExpression|It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as MethodExpression;
        return this.argumentsMatcher.matched(left.args, rightExpression.args);

    }
}
