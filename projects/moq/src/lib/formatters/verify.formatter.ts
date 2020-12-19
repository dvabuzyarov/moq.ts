import { Expressions } from "../reflector/expressions";
import { Interaction } from "../interactions";
import { ExpressionsFormatter } from "./expressions.formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions.formatter";

/**
 * @hidden
 */
export class VerifyFormatter {

    constructor(
        private expressionsFormatter: ExpressionsFormatter,
        private trackedExpressionsFormatter: TrackedExpressionsFormatter) {
    }

    public format(
        expected: Expressions<any>,
        timesMessage: string,
        haveBeenCalledTimes: number,
        interactions: Interaction[],
        mockName?: string): string {
        const expectedExpressionMessage = this.expressionsFormatter.format(expected, timesMessage, haveBeenCalledTimes, mockName);
        const trackedExpressionsMessage = this.trackedExpressionsFormatter.format(interactions);
        const delimiter = "-------------------------------------";
        return `${expectedExpressionMessage}\n${delimiter}\nTracked calls:\n${trackedExpressionsMessage}\n${delimiter}\n`;
    }
}
