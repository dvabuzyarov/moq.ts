import { MethodExpression } from "../reflector/expressions";
import { ConstantFormatter } from "./constant.formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";

/**
 * @hidden
 */
export class MethodFormatter {

    constructor(private readonly constantFormatter: ConstantFormatter,
                private readonly propertyKeyFormatter: PropertyKeyFormatter) {

    }

    public format(expression: MethodExpression): string {
        const formatted: string[] = [];

        for (const arg of expression.args) {
            formatted.push(this.constantFormatter.format(arg));
        }

        const value = formatted.join(", ");
        const propertyKey = this.propertyKeyFormatter.format(expression.name);
        return `${propertyKey}(${value})`;
    }
}
