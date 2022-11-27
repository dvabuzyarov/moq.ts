import { ComplexExpressionGuard } from "./complex-expression.guard";
import { ComplexExpressionValidator } from "./complex-expression.validator";
import { ExpressionGuardExceptionFactory } from "./expression-guard-exception.factory";
import { ExpressionValidator } from "./expression.validator";
import { FunctionExpressionValidator } from "./function-expression.validator";
import { GetPropertyExpressionValidator } from "./get-property-expression.validator";
import { SetPropertyExpressionValidator } from "./set-property-expression.validator";
import { InOperatorExpressionValidator } from "./in-operator-expression.validator";
import { InstanceMethodExpressionValidator } from "./instance-method-expression.validator";
import { NewOperatorExpressionValidator } from "./new-operator-expression.validator";
import { ComplexExpressionErrorFormatter } from "./expression.formatters/complex-expression.error-formatter";
import expressionFormatters from "./expression.formatters/index";

/**
 * @hidden
 */
export default [
    {
        provide: ComplexExpressionGuard,
        useClass: ComplexExpressionGuard,
        deps: [ComplexExpressionValidator, ExpressionGuardExceptionFactory]
    },
    {provide: ComplexExpressionValidator, useClass: ComplexExpressionValidator, deps: [ExpressionValidator]},
    {
        provide: ExpressionGuardExceptionFactory,
        useClass: ExpressionGuardExceptionFactory,
        deps: [ComplexExpressionErrorFormatter]
    },
    {
        provide: ExpressionValidator, useClass: ExpressionValidator, deps: [
            FunctionExpressionValidator,
            GetPropertyExpressionValidator,
            SetPropertyExpressionValidator,
            InOperatorExpressionValidator,
            InstanceMethodExpressionValidator,
            NewOperatorExpressionValidator
        ]
    },
    {provide: FunctionExpressionValidator, useClass: FunctionExpressionValidator, deps: []},
    {provide: GetPropertyExpressionValidator, useClass: GetPropertyExpressionValidator, deps: []},
    {provide: SetPropertyExpressionValidator, useClass: SetPropertyExpressionValidator, deps: []},
    {provide: InOperatorExpressionValidator, useClass: InOperatorExpressionValidator, deps: []},
    {provide: InstanceMethodExpressionValidator, useClass: InstanceMethodExpressionValidator, deps: []},
    {provide: NewOperatorExpressionValidator, useClass: NewOperatorExpressionValidator, deps: []},
    ...expressionFormatters
];
