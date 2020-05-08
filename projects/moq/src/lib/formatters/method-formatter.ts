import { MethodInteraction } from "../interactions";
import { ConstantFormatter } from "./constant-formatter";

/**
 * @hidden
 */
export class MethodExpressionFormatter {

    constructor(private constantFormatter: ConstantFormatter) {

    }

    public format(expression: MethodInteraction): string {
        const value = this.constantFormatter.format(expression.args);
        return `(${value})`;
    }
}
