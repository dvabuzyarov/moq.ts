import {
    Expressions,
    FunctionExpression,
    GetPropertyExpression,
    MethodExpression,
    NewOperatorExpression
} from "../../../reflector/expressions";
import { FunctionExpressionFormatter } from "../../../formatters/function-expression.formatter";
import { PropertyKeyFormatter } from "../../../formatters/property-key.formatter";
import { MethodExpressionFormatter } from "../../../formatters/method-expression.formatter";
import { ObjectFormatter } from "../../../object-formatters/object.formatter";

export class GuardedExpressionFormatter {
    constructor(
        private readonly functionFormatter: FunctionExpressionFormatter,
        private readonly propertyKeyFormatter: PropertyKeyFormatter,
        private readonly instanceMethodFormatter: MethodExpressionFormatter,
        private readonly objectFormatter: ObjectFormatter) {
    }

    public format(expression: Expressions<unknown>, name: string) {
        if (expression instanceof FunctionExpression) {
            return this.functionFormatter.format(expression);
        }
        if (expression instanceof GetPropertyExpression) {
            return `.${this.propertyKeyFormatter.format(expression.name)}`;
        }
        if (expression instanceof MethodExpression) {
            return `.${this.instanceMethodFormatter.format(expression)}`;
        }
        if (expression instanceof NewOperatorExpression) {
            return `new ${name}(${this.objectFormatter.format(expression.args)})`;
        }

        return `[${expression}]`;
    }
}
