import {
    Expressions,
    FunctionExpression,
    GetPropertyExpression,
    MethodExpression,
    NewOperatorExpression
} from "../../reflector/expressions";
import { FunctionExpressionFormatter } from "../../formatters/function-expression.formatter";
import { PropertyKeyFormatter } from "../../formatters/property-key.formatter";
import { MethodExpressionFormatter } from "../../formatters/method-expression.formatter";
import { NamePrefixProvider } from "./name-prefix.provider";
import { ObjectFormatter } from "../../object-formatters/object.formatter";

/**
 * @hidden
 */
export class AutoMockNameFormatter {
    constructor(
        private readonly namePrefixProvider: NamePrefixProvider,
        private readonly methodFormatter: FunctionExpressionFormatter,
        private readonly propertyKeyFormatter: PropertyKeyFormatter,
        private readonly namedMethodFormatter: MethodExpressionFormatter,
        private readonly objectFormatter: ObjectFormatter) {
    }

    public format<T>(name: string | undefined, expression: Expressions<T>): string {
        const prefix = this.namePrefixProvider.get(name);
        if (expression instanceof FunctionExpression) {
            return `${prefix}${this.methodFormatter.format(expression)}`;
        }
        if (expression instanceof GetPropertyExpression) {
            return `${prefix}.${this.propertyKeyFormatter.format(expression.name)}`;
        }
        if (expression instanceof MethodExpression) {
            return `${prefix}.${this.namedMethodFormatter.format(expression)}`;
        }
        if (expression instanceof NewOperatorExpression) {
            return `new ${name}(${this.objectFormatter.format(expression.args)})`;
        }

        return `${name}[${expression}]`;
    }
}
