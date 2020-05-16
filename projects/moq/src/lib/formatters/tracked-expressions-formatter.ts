import { ExpressionFormatter } from "./expression-formatter";
import { Interaction } from "../interactions";

/**
 * @hidden
 */
export class TrackedExpressionsFormatter {

    constructor(private expressionFormatter: ExpressionFormatter) {

    }

    public format(trackedExpressions: Interaction[]): string {
        let result = "";
        for (const expression of trackedExpressions) {
            result += `${this.expressionFormatter.format(expression)}\n`;
        }

        return result.substr(0, result.length - 1);
    }
}
