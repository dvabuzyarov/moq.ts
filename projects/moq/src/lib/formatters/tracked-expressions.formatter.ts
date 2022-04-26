import { InteractionFormatter } from "./interaction.formatter";
import { Expression } from "../reflector/expressions";

/**
 * @hidden
 */
export class TrackedExpressionsFormatter {

    constructor(private interactionFormatter: InteractionFormatter) {

    }

    public format(trackedExpressions: Expression[]): string {
        let result = "";
        for (const expression of trackedExpressions) {
            result += `${this.interactionFormatter.format(expression)}\n`;
        }

        return result.substr(0, result.length - 1);
    }
}
