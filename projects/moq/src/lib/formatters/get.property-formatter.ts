import { GetPropertyInteraction } from "../interactions";
import { PropertyKeyFormatter } from "./property-key.formatter";

/**
 * @hidden
 */
export class GetPropertyExpressionFormatter {
    constructor(private propertyKeyFormatter: PropertyKeyFormatter) {

    }

    public format(expression: GetPropertyInteraction): string {
        const propertyKey = this.propertyKeyFormatter.format(expression.name);
        return `Getter of \'${propertyKey}\'`;
    }
}
