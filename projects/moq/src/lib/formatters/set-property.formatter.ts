import { SetPropertyExpression } from "../reflector/expressions";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { ObjectFormatter } from "../object-formatters/object.formatter";

/**
 * @hidden
 */
export class SetPropertyFormatter {

    constructor(private objectFormatter: ObjectFormatter,
                private propertyKeyFormatter: PropertyKeyFormatter) {

    }

    public format(expression: SetPropertyExpression): string {
        const value = this.objectFormatter.format(expression.value);
        const propertyKey = this.propertyKeyFormatter.format(expression.name);
        return `Assignment of ${value} to property \'${propertyKey}\'`;
    }
}
