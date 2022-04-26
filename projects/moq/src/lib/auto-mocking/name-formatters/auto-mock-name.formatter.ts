import { Expressions } from "../../reflector/expressions";
import { FunctionFormatter } from "../../formatters/function.formatter";
import { PropertyKeyFormatter } from "../../formatters/property-key.formatter";
import { MethodFormatter } from "../../formatters/method.formatter";
import { ConstantFormatter } from "../../formatters/constant.formatter";
import { NamePrefixProvider } from "./name-prefix.provider";
import {
    GetPropertyExpression,
    FunctionExpression,
    MethodExpression,
    NewOperatorExpression
} from "../../reflector/expressions";

/**
 * @hidden
 */
export class AutoMockNameFormatter {
    constructor(
        private readonly namePrefixProvider: NamePrefixProvider,
        private readonly methodFormatter: FunctionFormatter,
        private readonly propertyKeyFormatter: PropertyKeyFormatter,
        private readonly namedMethodFormatter: MethodFormatter,
        private readonly constantFormatter: ConstantFormatter) {
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
            return `new ${name}(${this.constantFormatter.format(expression.args)})`;
        }

        return `${name}[${expression}]`;
    }
}
