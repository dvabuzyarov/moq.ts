import { FunctionExpression } from "../reflector/expressions";
import { ConstantFormatter } from "./constant.formatter";

/**
 * @hidden
 */
export class FunctionFormatter {

    constructor(private constantFormatter: ConstantFormatter) {

    }

    public format(expression: FunctionExpression): string {
        const value = this.constantFormatter.format(expression.args);
        return `(${value})`;
    }
}
