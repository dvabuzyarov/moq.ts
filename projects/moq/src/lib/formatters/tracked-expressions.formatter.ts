import { InteractionFormatter } from "./interaction.formatter";
import { Interaction } from "../interactions";

/**
 * @hidden
 */
export class TrackedExpressionsFormatter {

    constructor(private interactionFormatter: InteractionFormatter) {

    }

    public format(trackedExpressions: Interaction[]): string {
        let result = "";
        for (const expression of trackedExpressions) {
            result += `${this.interactionFormatter.format(expression)}\n`;
        }

        return result.substr(0, result.length - 1);
    }
}
