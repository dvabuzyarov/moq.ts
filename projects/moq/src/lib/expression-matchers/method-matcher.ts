import {ArgumentsMatcher} from "./arguments-matcher";
import {MethodExpression} from "../expressions";
import {ExpectedMethodExpression} from "../expected-expressions/expected-expressions";
import {It} from "../expected-expressions/expression-predicates";

/**
 * @hidden
 */
export class MethodExpressionMatcher {

    constructor(private argumentsMatcher: ArgumentsMatcher) {

    }

    public matched(left: MethodExpression, right: ExpectedMethodExpression|It<any>): boolean {
        if (right instanceof It) {
            return (right as It<any>).test(left);
        }

        const rightExpression = right as ExpectedMethodExpression;
        return this.argumentsMatcher.matched(left.args, rightExpression.args);

    }
}
