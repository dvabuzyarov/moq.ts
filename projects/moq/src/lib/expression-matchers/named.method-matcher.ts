import { ArgumentsMatcher } from "./arguments-matcher";
import { NamedMethodExpression } from "../expressions";
import { ExpectedNamedMethodExpression } from "../expected-expressions/expected-expressions";
import { It } from "../expected-expressions/expression-predicates";

/**
 * @hidden
 */
export class NamedMethodExpressionMatcher {

    constructor(private argumentsMatcher: ArgumentsMatcher = new ArgumentsMatcher()) {

    }

    public matched(left: NamedMethodExpression, right: ExpectedNamedMethodExpression | It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as ExpectedNamedMethodExpression;
        if (left.name === rightExpression.name) {
            return this.argumentsMatcher.matched(left.args, rightExpression.args);
        }

        return false;
    }
}
