import { NewOperatorExpression } from "../reflector/expressions";
import { ConstantFormatter } from "./constant.formatter";

/**
 * @hidden
 */
export class NewOperatorFormatter {

    constructor(private constantFormatter: ConstantFormatter) {

    }

    public format(expression: NewOperatorExpression): string {
        const value = this.constantFormatter.format(expression.args);
        return `new constructor(${value})`;
    }
}
