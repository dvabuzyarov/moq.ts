import { GetPropertyEqualityComparer } from "./get-property.equality-comparer";
import { SetPropertyEqualityComparer } from "./set-property.equality-comparer";
import { MethodEqualityComparer } from "./method.equality-comparer";
import { InstanceMethodEqualityComparer } from "./instance-method.equality-comparer";
import { Expressions } from "../reflector/expressions";
import { InOperatorEqualityComparer } from "./in-operator.equality-comparer";
import { NewOperatorEqualityComparer } from "./new-operator.equality-comparer";
import { ItEqualityComparer } from "./it.equality-comparer";
import { It } from "../reflector/expression-predicates";
import {
    GetPropertyExpression,
    InOperatorExpression,
    FunctionExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";

/**
 * @hidden
 */
export class ExpressionEqualityComparer {

    constructor(private readonly getPropertyExpressionMatcher: GetPropertyEqualityComparer,
                private readonly setPropertyExpressionMatcher: SetPropertyEqualityComparer,
                private readonly methodExpressionMatcher: MethodEqualityComparer,
                private readonly namedMethodExpressionMatcher: InstanceMethodEqualityComparer,
                private readonly inOperatorExpressionMatcher: InOperatorEqualityComparer,
                private readonly newOperatorExpressionMatcher: NewOperatorEqualityComparer,
                private readonly itEqualityComparer: ItEqualityComparer) {

    }

    public equals<T>(left: Expressions<T>, right: Expressions<T>): boolean {
        if (left === right) return true;
        if (left instanceof It || right instanceof It) {
            return this.itEqualityComparer.equals(left, right);
        }
        if (left instanceof GetPropertyExpression && right instanceof GetPropertyExpression) {
            return this.getPropertyExpressionMatcher.equals(left, right);
        }
        if (left instanceof SetPropertyExpression && right instanceof SetPropertyExpression) {
            return this.setPropertyExpressionMatcher.equals(left, right);
        }
        if (left instanceof InOperatorExpression && right instanceof InOperatorExpression) {
            return this.inOperatorExpressionMatcher.equals(left, right);
        }
        if (left instanceof FunctionExpression && right instanceof FunctionExpression) {
            return this.methodExpressionMatcher.equals(left, right);
        }
        if (left instanceof MethodExpression && right instanceof MethodExpression) {
            return this.namedMethodExpressionMatcher.equals(left, right);
        }
        if (left instanceof NewOperatorExpression && right instanceof NewOperatorExpression) {
            return this.newOperatorExpressionMatcher.equals(left, right);
        }

        return false;
    }
}
