
import {It} from '../../lib/expected-expressions/expression-predicates';
import {ExpressionMatcher} from '../../lib/expression-matchers/expression-matcher';
import {
    GetPropertyExpression, SetPropertyExpression, MethodExpression,
    NamedMethodExpression
} from '../../lib/expressions';
import {GetPropertyExpressionMatcher} from '../../lib/expression-matchers/get.property-matcher';
import {
    ExpectedGetPropertyExpression,
    ExpectedSetPropertyExpression, ExpectedMethodExpression, ExpectedNamedMethodExpression
} from '../../lib/expected-expressions/expected-expressions';
import {SetPropertyExpressionMatcher} from '../../lib/expression-matchers/set.property-matcher';
import {MethodExpressionMatcher} from '../../lib/expression-matchers/method-matcher';
import {NamedMethodExpressionMatcher} from '../../lib/expression-matchers/named.method-matcher';

describe('Expression matcher', () => {
    function argumentsMatcherFactory<T>(matched?: (left: any[], right: (any|It<any>)[])=> boolean): T {
        return (<any>{
            matched: matched
        } as T)
    }

    it('Returns true when both are undefined', ()=> {
        const left = undefined;
        const right = undefined;

        const matcher = new ExpressionMatcher(undefined, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when both are null', ()=> {
        const left = null;
        const right = null;

        const matcher = new ExpressionMatcher(undefined, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });


    it('Returns true when right is undefined', ()=> {
        const left = new GetPropertyExpression('name');
        const right = undefined;

        const matcher = new ExpressionMatcher(undefined, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns value from GetPropertyExpressionMatcher when left and right are GetProperty expressions', ()=> {
        const left = new GetPropertyExpression('left name');
        const right = new ExpectedGetPropertyExpression('right name');

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const getPropertyExpressionMatcher = argumentsMatcherFactory<GetPropertyExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(getPropertyExpressionMatcher, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from GetPropertyExpressionMatcher when left is GetProperty and right is It', ()=> {
        const left = new GetPropertyExpression('name');
        const right = It.Is(()=> {
        });

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const getPropertyExpressionMatcher = argumentsMatcherFactory<GetPropertyExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(getPropertyExpressionMatcher, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from SetPropertyExpressionMatcher when left and right are SetProperty expressions', ()=> {
        const left = new SetPropertyExpression('left name', 'left value');
        const right = new ExpectedSetPropertyExpression('right name', 'right value');

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const setPropertyExpressionMatcher = argumentsMatcherFactory<SetPropertyExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, setPropertyExpressionMatcher, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from SetPropertyExpressionMatcher when left is SetProperty and right is It', ()=> {
        const left = new SetPropertyExpression('name', 'value');
        const right = It.Is(()=> {
        });

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const setPropertyExpressionMatcher = argumentsMatcherFactory<SetPropertyExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, setPropertyExpressionMatcher, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from MethodExpressionMatcher when left and right are Method expressions', ()=> {
        const left = new MethodExpression([]);
        const right = new ExpectedMethodExpression([]);

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const methodExpressionMatcher = argumentsMatcherFactory<MethodExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, undefined, methodExpressionMatcher, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from MethodExpressionMatcher when left is Method expression and right is It', ()=> {
        const left = new MethodExpression([]);
        const right = It.Is(()=> {
        });

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const methodExpressionMatcher = argumentsMatcherFactory<MethodExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, undefined, methodExpressionMatcher, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from NamedMethodExpressionMatcher when left and right are NamedMethod expressions', ()=> {
        const left = new NamedMethodExpression('name', []);
        const right = new ExpectedNamedMethodExpression('name', []);

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const namedMethodExpressionMatcher = argumentsMatcherFactory<NamedMethodExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, undefined, undefined, namedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from NamedMethodExpressionMatcher when left is NamedMethod expression and right is It', ()=> {
        const left = new NamedMethodExpression('name', []);
        const right = It.Is(()=> {
        });

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const namedMethodExpressionMatcher = argumentsMatcherFactory<NamedMethodExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, undefined, undefined, namedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns false when left and right represent different expressions', ()=> {
        const left = new NamedMethodExpression('name', []);
        const right = new ExpectedGetPropertyExpression('name');

        const matcher = new ExpressionMatcher(undefined, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});