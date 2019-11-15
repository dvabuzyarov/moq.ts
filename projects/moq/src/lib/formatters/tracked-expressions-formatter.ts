import { ExpressionFormatter } from "./expression-formatter";
import { Interactions } from "../interactions";

/**
 * @hidden
 */
export class TrackedExpressionsFormatter {

    constructor(private expressionFormatter: ExpressionFormatter = new ExpressionFormatter()) {

    }

    public format(trackedExpressions: Interactions[]): string {
        let result = "";
        for (const expression of trackedExpressions) {
            result += `${this.expressionFormatter.format(expression)}\n`;
        }

        return result.substr(0, result.length - 1);
    }
}
