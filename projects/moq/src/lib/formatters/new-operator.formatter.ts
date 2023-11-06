import { NewOperatorExpression } from "../reflector/expressions";
import { ObjectFormatter } from "../object-formatters/object.formatter";

/**
 * @hidden
 */
export class NewOperatorFormatter {

    constructor(private objectFormatter: ObjectFormatter) {

    }

    public format(expression: NewOperatorExpression): string {
        const value = this.objectFormatter.format(expression.args);
        return `new constructor(${value})`;
    }
}
