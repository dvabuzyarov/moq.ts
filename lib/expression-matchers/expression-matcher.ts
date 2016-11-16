import {GetPropertyExpressionMatcher} from './get.property-matcher';
import {SetPropertyExpressionMatcher} from './set.property-matcher';
import {MethodExpressionMatcher} from './method-matcher';
import {NamedMethodExpressionMatcher} from './named.method-matcher';
import {
    Expressions, GetPropertyExpression, SetPropertyExpression, MethodExpression,
    NamedMethodExpression
} from '../expressions';
import {
    ExpectedExpressions, ExpectedGetPropertyExpression,
    ExpectedSetPropertyExpression, ExpectedMethodExpression, ExpectedNamedMethodExpression
} from '../expected-expressions/expected-expressions';
import {It} from '../expected-expressions/expression-predicates';

export class ExpressionMatcher {

    constructor(private getPropertyExpressionMatcher: GetPropertyExpressionMatcher,
                private setPropertyExpressionMatcher: SetPropertyExpressionMatcher,
                private methodExpressionMatcher: MethodExpressionMatcher,
                private namedMethodExpressionMatcher: NamedMethodExpressionMatcher) {

    }

    public matched(left: Expressions, right: ExpectedExpressions<any>): boolean {

        if (left === right) return true;
        if (right === undefined) return true;

        if (left instanceof GetPropertyExpression && (right instanceof ExpectedGetPropertyExpression || right instanceof It))
            return this.getPropertyExpressionMatcher.matched(left, <ExpectedGetPropertyExpression|It<any>>right);
        if (left instanceof SetPropertyExpression && (right instanceof ExpectedSetPropertyExpression || right instanceof It))
            return this.setPropertyExpressionMatcher.matched(left, <ExpectedSetPropertyExpression|It<any>>right);
        if (left instanceof MethodExpression && (right instanceof ExpectedMethodExpression || right instanceof It))
            return this.methodExpressionMatcher.matched(left, <ExpectedMethodExpression|It<any>>right);
        if (left instanceof NamedMethodExpression && (right instanceof ExpectedNamedMethodExpression || right instanceof It))
            return this.namedMethodExpressionMatcher.matched(left, <ExpectedNamedMethodExpression|It<any>>right);

        return false;
    }
}