import { FunctionExpression } from "../reflector/expressions";
import { ObjectFormatter } from "../object-formatters/object.formatter";

/**
 * @hidden
 */
export class FunctionExpressionFormatter {

    constructor(private readonly objectFormatter: ObjectFormatter) {

    }

    public format(expression: FunctionExpression): string {
        const value = this.objectFormatter.format(expression.args);
        return `(${value})`;
    }
}
