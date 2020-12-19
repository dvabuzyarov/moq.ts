import { NewOperatorInteraction } from "../interactions";
import { ConstantFormatter } from "./constant.formatter";

/**
 * @hidden
 */
export class NewOperatorFormatter {

    constructor(private constantFormatter: ConstantFormatter) {

    }

    public format(expression: NewOperatorInteraction): string {
        const value = this.constantFormatter.format(expression.args);
        return `new constructor(${value})`;
    }
}
