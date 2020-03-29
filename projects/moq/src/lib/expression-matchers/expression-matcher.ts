import { GetPropertyExpressionMatcher } from "./get.property-matcher";
import { SetPropertyExpressionMatcher } from "./set.property-matcher";
import { MethodExpressionMatcher } from "./method-matcher";
import { NamedMethodExpressionMatcher } from "./named.method-matcher";
import {
    GetPropertyInteraction, InOperatorInteraction,
    Interactions,
    MethodInteraction,
    NamedMethodInteraction,
    SetPropertyInteraction
} from "../interactions";
import {
    ExpectedExpressions,
    ExpectedGetPropertyExpression, ExpectedInOperatorExpression,
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

    constructor(private getPropertyExpressionMatcher = new GetPropertyExpressionMatcher(),
                private setPropertyExpressionMatcher = new SetPropertyExpressionMatcher(),
                private methodExpressionMatcher = new MethodExpressionMatcher(),
                private namedMethodExpressionMatcher = new NamedMethodExpressionMatcher(),
                private inOperatorExpressionMatcher = new InOperatorMatcher()) {

    }

    public matched(left: Interactions, right: ExpectedExpressions<any>): boolean {

        if (left === right) return true;
        if (right === undefined) return true;

        if (left instanceof GetPropertyInteraction && (right instanceof ExpectedGetPropertyExpression || right instanceof It)) {
            return this.getPropertyExpressionMatcher.matched(left, <ExpectedGetPropertyExpression | It<any>>right);
        }
        if (left instanceof SetPropertyInteraction && (right instanceof ExpectedSetPropertyExpression || right instanceof It)) {
            return this.setPropertyExpressionMatcher.matched(left, <ExpectedSetPropertyExpression | It<any>>right);
        }
        if (left instanceof InOperatorInteraction && (right instanceof ExpectedInOperatorExpression || right instanceof It)) {
            return this.inOperatorExpressionMatcher.matched(left, <ExpectedInOperatorExpression | It<any>>right);
        }
        if (left instanceof MethodInteraction && (right instanceof ExpectedMethodExpression || right instanceof It)) {
            return this.methodExpressionMatcher.matched(left, <ExpectedMethodExpression | It<any>>right);
        }
        if (left instanceof NamedMethodInteraction && (right instanceof ExpectedNamedMethodExpression || right instanceof It)) {
            return this.namedMethodExpressionMatcher.matched(left, <ExpectedNamedMethodExpression | It<any>>right);
        }

        return false;
    }
}
