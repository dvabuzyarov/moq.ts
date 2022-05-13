import {
    Expressions,
    FunctionExpression,
    GetPropertyExpression,
    MethodExpression,
    NewOperatorExpression
} from "../../../reflector/expressions";
import { FunctionFormatter } from "../../../formatters/function.formatter";
import { PropertyKeyFormatter } from "../../../formatters/property-key.formatter";
import { MethodFormatter } from "../../../formatters/method.formatter";
import { ConstantFormatter } from "../../../formatters/constant.formatter";

export class ExpressionFormatter {
    constructor(
        private readonly functionFormatter: FunctionFormatter,
        private readonly propertyKeyFormatter: PropertyKeyFormatter,
        private readonly instanceMethodFormatter: MethodFormatter,
        private readonly constantFormatter: ConstantFormatter) {
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
            return `new ${name}(${this.constantFormatter.format(expression.args)})`;
        }

        return `[${expression}]`;
    }
}
