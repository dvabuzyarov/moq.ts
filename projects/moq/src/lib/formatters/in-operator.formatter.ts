import { InOperatorExpression } from "../reflector/expressions";
import { PropertyKeyFormatter } from "./property-key.formatter";

/**
 * @hidden
 */
export class InOperatorFormatter {
    constructor(private propertyKeyFormatter: PropertyKeyFormatter) {

    }

    public format(expression: InOperatorExpression): string {
        const propertyKey = this.propertyKeyFormatter.format(expression.name);
        return `In operator for \'${propertyKey}\'`;
    }
}
