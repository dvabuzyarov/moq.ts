import {ExpressionFormatter} from './expression-formatter';
import {expressionFormatterFactory} from './factories';
import {Expressions} from '../expressions';

export function trackedExpressionsFormatterFactory (): TrackedExpressionsFormatter {
    return new TrackedExpressionsFormatter(expressionFormatterFactory());
}

export class TrackedExpressionsFormatter {

    constructor(private expressionFormatter: ExpressionFormatter) {

    }

    public format(trackedExpressions: Expressions[]): string {
        throw new Error('not implemented');
    }
}