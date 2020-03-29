import { InOperatorInteraction } from "../interactions";
import { PropertyKeyFormatter } from "./property-key.formatter";

/**
 * @hidden
 */
export class InOperatorFormatter {
    constructor(private propertyKeyFormatter = new PropertyKeyFormatter()) {

    }

    public format(expression: InOperatorInteraction): string {
        const propertyKey = this.propertyKeyFormatter.format(expression.name);
        return `In operator for \'${propertyKey}\'`;
    }
}
