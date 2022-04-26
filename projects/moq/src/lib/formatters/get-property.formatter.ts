import { GetPropertyExpression } from "../reflector/expressions";
import { PropertyKeyFormatter } from "./property-key.formatter";

/**
 * @hidden
 */
export class GetPropertyFormatter {
    constructor(private readonly propertyKeyFormatter: PropertyKeyFormatter) {

    }

    public format(interaction: GetPropertyExpression): string {
        const propertyKey = this.propertyKeyFormatter.format(interaction.name);
        return `Getter of \'${propertyKey}\'`;
    }
}
