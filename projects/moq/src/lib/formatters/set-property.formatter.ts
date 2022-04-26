import { SetPropertyExpression } from "../reflector/expressions";
import { ConstantFormatter } from "./constant.formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";

/**
 * @hidden
 */
export class SetPropertyFormatter {

    constructor(private constantFormatter: ConstantFormatter,
                private propertyKeyFormatter: PropertyKeyFormatter) {

    }

    public format(expression: SetPropertyExpression): string {
        const value = this.constantFormatter.format(expression.value);
        const propertyKey = this.propertyKeyFormatter.format(expression.name);
        return `Assignment of ${value} to property \'${propertyKey}\'`;
    }
}
