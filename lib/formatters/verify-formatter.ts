import {ExpectedExpressions} from '../expected-expressions/expected-expressions';
import {Expressions} from '../expressions';
import {ExpectedExpressionFormatter, expectedExpressionFormatterFactory} from './expected-expression-formatter';
import {TrackedExpressionsFormatter, trackedExpressionsFormatterFactory} from './tracked-expressions-formatter';

export function verifyFormatterFactory(): VerifyFormatter {
    return new VerifyFormatter(expectedExpressionFormatterFactory(), trackedExpressionsFormatterFactory());
}

export class VerifyFormatter {

    constructor(
        private expectedExpressionFormatter: ExpectedExpressionFormatter,
        private trackedExpressionsFormatter: TrackedExpressionsFormatter) {

    }

    public format(expected: ExpectedExpressions<any>, timesMessage: string, haveBeenCalledTimes: number, trackedExpressions: Expressions[], mockName?: string): string {
        const expectedExpressionMessage = this.expectedExpressionFormatter.format(expected, timesMessage, haveBeenCalledTimes, mockName);
        const trackedExpressionsMessage = this.trackedExpressionsFormatter.format(trackedExpressions);
        return `${expectedExpressionMessage}\n-------------------------------------\nTracked calls:\n${trackedExpressionsMessage}`
    }
}