import { NewOperatorInteraction } from "../interactions";
import { It } from "../reflector/expression-predicates";
import { NewOperatorExpression } from "../reflector/expressions";
import { ArgumentsMatcher } from "./arguments.matcher";

/**
 * @hidden
 */
export class NewOperatorExpressionMatcher {

    constructor(private argumentsMatcher: ArgumentsMatcher) {

    }

    public matched(left: NewOperatorInteraction, right: NewOperatorExpression | It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as NewOperatorExpression;
        return this.argumentsMatcher.matched(left.args, rightExpression.args);
    }
}
