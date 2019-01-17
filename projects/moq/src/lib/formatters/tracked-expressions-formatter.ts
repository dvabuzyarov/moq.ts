import { ExpressionFormatter } from "./expression-formatter";
import { expressionFormatterFactory } from "./factories";
import { Expressions } from "../expressions";

/**
 * @hidden
 */
export class TrackedExpressionsFormatter {

    constructor(private expressionFormatter: ExpressionFormatter) {

    }

    public format(trackedExpressions: Expressions[]): string {
        let result = "";
        for (const expression of trackedExpressions) {
            result += `${this.expressionFormatter.format(expression)}\n`;
        }

        return result.substr(0, result.length - 1);
    }
}

/**
 * @hidden
 */
export function trackedExpressionsFormatterFactory(): TrackedExpressionsFormatter {
    return new TrackedExpressionsFormatter(expressionFormatterFactory());
}
