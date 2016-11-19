import {ExpectedExpressions} from './expected-expressions/expected-expressions';
import {Expressions} from './expressions';
import {ExpressionMatcher} from './expression-matchers/expression-matcher';

export class CallCounter {

    constructor(private expressionMatcher: ExpressionMatcher) {

    }

    public count<T>(expected: ExpectedExpressions<T>, expressions: Expressions[]): number {
        let count = 0;
        for (const expression of expressions) {
            if (this.expressionMatcher.matched(expression, expected) === true)
                count += 1;
        }

        return count;
    }
}