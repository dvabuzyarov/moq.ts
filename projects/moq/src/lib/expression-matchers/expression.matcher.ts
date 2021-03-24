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
    NewOperatorInteraction,
    SetPropertyInteraction
} from "../interactions";
import {
    Expressions,
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NamedMethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";
import { It } from "../reflector/expression-predicates";
import { InOperatorExpressionMatcher } from "./in-operator.matcher";
import { NewOperatorExpressionMatcher } from "./new-operator.matcher";
import { ItMatcher } from "./it.matcher";

/**
 * @hidden
 */
export class ExpressionMatcher {

    constructor(private readonly getPropertyExpressionMatcher: GetPropertyExpressionMatcher,
                private readonly setPropertyExpressionMatcher: SetPropertyExpressionMatcher,
                private readonly methodExpressionMatcher: MethodExpressionMatcher,
                private readonly namedMethodExpressionMatcher: NamedMethodExpressionMatcher,
                private readonly inOperatorExpressionMatcher: InOperatorExpressionMatcher,
                private readonly newOperatorExpressionMatcher: NewOperatorExpressionMatcher,
                private readonly itMatcher: ItMatcher) {

    }

    public matched(left: Interaction, right: Expressions<any>): boolean {
        if (left === right) return true;
        if (right === undefined) return true;
        if (right instanceof It) {
            return this.itMatcher.matched(left, right);
        }
        if (left instanceof GetPropertyInteraction && right instanceof GetPropertyExpression) {
            return this.getPropertyExpressionMatcher.matched(left, right);
        }
        if (left instanceof SetPropertyInteraction && right instanceof SetPropertyExpression) {
            return this.setPropertyExpressionMatcher.matched(left, right);
        }
        if (left instanceof InOperatorInteraction && right instanceof InOperatorExpression) {
            return this.inOperatorExpressionMatcher.matched(left, right);
        }
        if (left instanceof MethodInteraction && right instanceof MethodExpression) {
            return this.methodExpressionMatcher.matched(left, right);
        }
        if (left instanceof NamedMethodInteraction && right instanceof NamedMethodExpression) {
            return this.namedMethodExpressionMatcher.matched(left, right);
        }
        if (left instanceof NewOperatorInteraction && right instanceof NewOperatorExpression) {
            return this.newOperatorExpressionMatcher.matched(left, right);
        }

        return false;
    }
}
