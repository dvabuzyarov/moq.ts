import {
    Expressions,
    FunctionExpression,
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../../reflector/expressions";
import { FunctionExpressionValidator } from "./function-expression.validator";
import { GetPropertyExpressionValidator } from "./get-property-expression.validator";
import { SetPropertyExpressionValidator } from "./set-property-expression.validator";
import { InstanceMethodExpressionValidator } from "./instance-method-expression.validator";
import { NewOperatorExpressionValidator } from "./new-operator-expression.validator";
import { It } from "../../reflector/expression-predicates";
import { InOperatorExpressionValidator } from "./in-operator-expression.validator";

export class ExpressionValidator {

    constructor(private readonly functionExpressionGuard: FunctionExpressionValidator,
                private readonly getPropertyExpressionGuard: GetPropertyExpressionValidator,
                private readonly setPropertyExpressionGuard: SetPropertyExpressionValidator,
                private readonly inOperatorExpressionGuard: InOperatorExpressionValidator,
                private readonly instanceMethodExpressionGuard: InstanceMethodExpressionValidator,
                private readonly newOperatorExpressionGuard: NewOperatorExpressionValidator) {
    }

    validate(expression: Expressions<unknown>) {
        switch (expression.constructor) {
            case FunctionExpression:
                return this.functionExpressionGuard.validate(expression as FunctionExpression);
            case GetPropertyExpression:
                return this.getPropertyExpressionGuard.validate(expression as GetPropertyExpression);
            case SetPropertyExpression:
                return this.setPropertyExpressionGuard.validate(expression as SetPropertyExpression);
            case InOperatorExpression:
                return this.inOperatorExpressionGuard.validate(expression as InOperatorExpression);
            case MethodExpression:
                return this.instanceMethodExpressionGuard.validate(expression as MethodExpression);
            case NewOperatorExpression:
                return this.newOperatorExpressionGuard.validate(expression as NewOperatorExpression);
            case It:
                return false;
            default:
                throw new Error(`Unknown expression type: ${expression.constructor.name}`);
        }
    }
}
