import { Expressions } from "../../reflector/expressions";
import { ComplexExpressionValidator } from "./complex-expression.validator";
import { ExpressionGuardExceptionFactory } from "./expression-guard-exception.factory";

export class ComplexExpressionGuard {

    constructor(private readonly complexExpressionValidator: ComplexExpressionValidator,
                private readonly expressionGuardExceptionFactory: ExpressionGuardExceptionFactory) {
    }

    verify(expressions: Expressions<unknown>[]) {
        const {valid, errors} = this.complexExpressionValidator.validate(expressions);
        if (valid === false) {
            throw this.expressionGuardExceptionFactory.create(errors);
        }
    }
}
