import {ExpressionMatcher} from '../lib/expression-matchers/expression-matcher';
import {CallCounter} from '../lib/call-counter';
import {ExpectedGetPropertyExpression} from '../lib/expected-expressions/expected-expressions';
import {GetPropertyExpression} from '../lib/expressions';

describe('Call counter', ()=>{

    function expressionMatcherFactory(): ExpressionMatcher {
        const matched = jasmine.createSpy('matched');
        return (<any>{
            matched: matched
        } as ExpressionMatcher)
    }

    it('Returns one as count of called expressions',()=>{
        const expressionMatcher = expressionMatcherFactory();
        (<jasmine.Spy>expressionMatcher.matched).and.returnValue(true);

        const counter = new CallCounter(expressionMatcher);
        const expectedExpression = new ExpectedGetPropertyExpression('property');
        const expression = new GetPropertyExpression('property');

        const actual = counter.count(expectedExpression, [expression]);

        expect(actual).toBe(1);
        expect(expressionMatcher.matched).toHaveBeenCalledWith(expression, expectedExpression);
    });

    it('Returns 0  as count of called expressions',()=>{
        const expressionMatcher = expressionMatcherFactory();
        (<jasmine.Spy>expressionMatcher.matched).and.returnValue(false);

        const counter = new CallCounter(expressionMatcher);
        const expectedExpression = new ExpectedGetPropertyExpression('property');
        const expression = new GetPropertyExpression('property');

        const actual = counter.count(expectedExpression, [expression]);

        expect(actual).toBe(0);
        expect(expressionMatcher.matched).toHaveBeenCalledWith(expression, expectedExpression);
    });
});