import { GetPropertyExpressionMatcher } from "./get-property.matcher";
import { SetPropertyExpressionMatcher } from "./set-property.matcher";
import { MethodExpressionMatcher } from "./method.matcher";
import { NamedMethodExpressionMatcher } from "./instance-method.matcher";
import {
    GetPropertyInteraction,
    InOperatorInteraction,
    Interaction,
    MethodInteraction,
    NamedMethodInteraction,
    SetPropertyInteraction
} from "../interactions";
import {
    ExpectedExpressions,
    ExpectedGetPropertyExpression,
    ExpectedInOperatorExpression,
    ExpectedMethodExpression,
    ExpectedNamedMethodExpression,
    ExpectedSetPropertyExpression
} from "../expected-expressions/expected-expressions";
import { It } from "../expected-expressions/expression-predicates";
import { InOperatorMatcher } from "./in-operator.matcher";

/**
 * @hidden
 */
export class ExpressionMatcher {

    constructor(private getPropertyExpressionMatcher: GetPropertyExpressionMatcher,
                private setPropertyExpressionMatcher: SetPropertyExpressionMatcher,
                private methodExpressionMatcher: MethodExpressionMatcher,
                private namedMethodExpressionMatcher: NamedMethodExpressionMatcher,
                private inOperatorExpressionMatcher: InOperatorMatcher) {

    }

    public matched(left: Interaction, right: ExpectedExpressions<any>): boolean {

        if (left === right) return true;
        if (right === undefined) return true;

        if (left instanceof GetPropertyInteraction && (right instanceof ExpectedGetPropertyExpression || right instanceof It)) {
            return this.getPropertyExpressionMatcher.matched(left, right);
        }
        if (left instanceof SetPropertyInteraction && (right instanceof ExpectedSetPropertyExpression || right instanceof It)) {
            return this.setPropertyExpressionMatcher.matched(left, right);
        }
        if (left instanceof InOperatorInteraction && (right instanceof ExpectedInOperatorExpression || right instanceof It)) {
            return this.inOperatorExpressionMatcher.matched(left, right);
        }
        if (left instanceof MethodInteraction && (right instanceof ExpectedMethodExpression || right instanceof It)) {
            return this.methodExpressionMatcher.matched(left, right);
        }
        if (left instanceof NamedMethodInteraction && (right instanceof ExpectedNamedMethodExpression || right instanceof It)) {
            return this.namedMethodExpressionMatcher.matched(left, right);
        }

        return false;
    }
}
