import {ArgumentsMatcher} from './arguments-matcher';
import {NamedMethodExpression} from '../expressions';
import {ExpectedNamedMethodExpression} from '../expected-expressions/expected-expressions';
import {It} from '../expected-expressions/expression-predicates';

export class NamedMethodExpressionMatcher{

    constructor(private argumentsMatcher: ArgumentsMatcher){

    }

    public matched(left: NamedMethodExpression, right: ExpectedNamedMethodExpression|It<any>): boolean{
        if (right instanceof It)
            return (right as It<any>).invoke(left);

        const rightExpression = right as ExpectedNamedMethodExpression;
        const argumentsAreMatched = this.argumentsMatcher.matched(left.arguments, rightExpression.arguments);
        return left.name === rightExpression.name && argumentsAreMatched;
    }
}