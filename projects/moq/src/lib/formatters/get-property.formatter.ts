import { GetPropertyInteraction } from "../interactions";
import { PropertyKeyFormatter } from "./property-key.formatter";

/**
 * @hidden
 */
export class GetPropertyFormatter {
    constructor(private propertyKeyFormatter: PropertyKeyFormatter) {

    }

    public format(interaction: GetPropertyInteraction): string {
        const propertyKey = this.propertyKeyFormatter.format(interaction.name);
        return `Getter of \'${propertyKey}\'`;
    }
}
