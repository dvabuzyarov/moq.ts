import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Interaction } from "../interactions";
import { ExpectedExpressionFormatter } from "./expected-expression-formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions-formatter";

/**
 * @hidden
 */
export class VerifyFormatter {

    constructor(
        private expectedExpressionFormatter: ExpectedExpressionFormatter,
        private trackedExpressionsFormatter: TrackedExpressionsFormatter) {
    }

    public format(
        expected: ExpectedExpressions<any>,
        timesMessage: string,
        haveBeenCalledTimes: number,
        trackedExpressions: Interaction[],
        mockName?: string): string {
        const expectedExpressionMessage = this.expectedExpressionFormatter.format(expected, timesMessage, haveBeenCalledTimes, mockName);
        const trackedExpressionsMessage = this.trackedExpressionsFormatter.format(trackedExpressions);
        const delimiter = "-------------------------------------";
        return `${expectedExpressionMessage}\n${delimiter}\nTracked calls:\n${trackedExpressionsMessage}\n${delimiter}\n`;
    }
}
