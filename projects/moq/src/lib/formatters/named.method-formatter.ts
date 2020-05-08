import { NamedMethodInteraction } from "../interactions";
import { ConstantFormatter } from "./constant-formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";

/**
 * @hidden
 */
export class NamedMethodExpressionFormatter {

    constructor(private constantFormatter: ConstantFormatter,
                private propertyKeyFormatter: PropertyKeyFormatter) {

    }

    public format(expression: NamedMethodInteraction): string {
        const formatted: string[] = [];

        expression.args.forEach(arg => {
            formatted.push(this.constantFormatter.format(arg));
        });

        const value = formatted.join(", ");
        const propertyKey = this.propertyKeyFormatter.format(expression.name);
        return `${propertyKey}(${value})`;
    }
}
