import { MethodExpression } from "../reflector/expressions";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { ObjectFormatter } from "../object-formatters/object.formatter";

/**
 * @hidden
 */
export class MethodExpressionFormatter {

    constructor(private readonly objectFormatter: ObjectFormatter,
                private readonly propertyKeyFormatter: PropertyKeyFormatter) {

    }

    public format(expression: MethodExpression): string {
        const formatted: string[] = [];

        for (const arg of expression.args) {
            formatted.push(this.objectFormatter.format(arg));
        }

        const value = formatted.join(", ");
        const propertyKey = this.propertyKeyFormatter.format(expression.name);
        return `${propertyKey}(${value})`;
    }
}
