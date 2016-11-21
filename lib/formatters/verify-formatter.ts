import {ExpectedExpressions} from '../expected-expressions/expected-expressions';
import {ExpressionFormatter} from './expression-formatter';
import {expressionFormatterFactory} from './factories';

export function verifyFormatterFactory (): VerifyFormatter {
    return new VerifyFormatter(expressionFormatterFactory());
}

export class VerifyFormatter {

    constructor(private expressionFormatter: ExpressionFormatter) {

    }

    public format(expected: ExpectedExpressions<any>, timesMessage: string, haveBeenCalledTimes: number): string {
        const expressionDescription = this.expressionFormatter.format(expected);
        return `${expressionDescription} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`;
    }
}