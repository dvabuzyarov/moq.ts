import { GetPropertyExpression } from "../expressions";
import { PropertyKeyFormatter } from "./property-key.formatter";

/**
 * @hidden
 */
export class GetPropertyExpressionFormatter {
    constructor(private propertyKeyFormatter: PropertyKeyFormatter = new PropertyKeyFormatter()) {

    }

    public format(expression: GetPropertyExpression): string {
        const propertyKey = this.propertyKeyFormatter.format(expression.name);
        return `Getter of \'${propertyKey}\'`;
    }
}
