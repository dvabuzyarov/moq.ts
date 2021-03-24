import { GetPropertyEqualityComparer } from "../expression.equality-comparers/get-property.equality-comparer";
import { SetPropertyEqualityComparer } from "../expression.equality-comparers/set-property.equality-comparer";
import { MethodEqualityComparer } from "../expression.equality-comparers/method.equality-comparer";
import { InstanceMethodEqualityComparer } from "../expression.equality-comparers/instance-method.equality-comparer";
import {
    Expressions,
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NamedMethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";
import { InOperatorEqualityComparer } from "../expression.equality-comparers/in-operator.equality-comparer";
import { NewOperatorEqualityComparer } from "../expression.equality-comparers/new-operator.equality-comparer";
import { ItEqualityComparer } from "../expression.equality-comparers/it.equality-comparer";
import { It } from "../reflector/expression-predicates";

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
        if (left instanceof It && right instanceof It) {
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
        if (left instanceof MethodExpression && right instanceof MethodExpression) {
            return this.methodExpressionMatcher.equals(left, right);
        }
        if (left instanceof NamedMethodExpression && right instanceof NamedMethodExpression) {
            return this.namedMethodExpressionMatcher.equals(left, right);
        }
        if (left instanceof NewOperatorExpression && right instanceof NewOperatorExpression) {
            return this.newOperatorExpressionMatcher.equals(left, right);
        }

        return false;
    }
}
