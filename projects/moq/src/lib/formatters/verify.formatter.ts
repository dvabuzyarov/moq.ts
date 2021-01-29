import { Expressions } from "../reflector/expressions";
import { ExpressionsFormatter } from "./expressions.formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions.formatter";
import { Tracker } from "../tracker/tracker";

/**
 * @hidden
 */
export class VerifyFormatter {

    constructor(
        private readonly expressionsFormatter: ExpressionsFormatter,
        private readonly trackedExpressionsFormatter: TrackedExpressionsFormatter,
        private readonly tracker: Tracker) {
    }

    public format(
        expected: Expressions<any>,
        timesMessage: string,
        haveBeenCalledTimes: number): string {
        const interactions = this.tracker.interactions();
        const expectedExpressionMessage = this.expressionsFormatter.format(expected, timesMessage, haveBeenCalledTimes);
        const trackedExpressionsMessage = this.trackedExpressionsFormatter.format(interactions);
        const delimiter = "-------------------------------------";
        return `${expectedExpressionMessage}\n${delimiter}\nTracked calls:\n${trackedExpressionsMessage}\n${delimiter}\n`;
    }
}
