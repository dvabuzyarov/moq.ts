import {ExpressionMatcher} from '../lib/expression-matcher';
import {
    GetPropertyInfo, SetPropertyInfo, MethodInfo,
    NamedMethodInfo
} from '../lib/expression-reflector';
import {It} from '../lib/expression-predicates';
import {GetPropertyExpressionMatcher} from '../lib/get.property.expression-matcher';
import {SetPropertyExpressionMatcher} from '../lib/set.property.expression-matcher';
import {MethodExpressionMatcher} from '../lib/method.expression-matcher';
import {NamedMethodExpressionMatcher} from '../lib/named.method.expression-matcher';

describe('Expression matcher', () => {
    function ArgumentsMatcherFactory<T>(matched?: (left: any[], right: (any|It<any>)[])=> boolean): T {
        return {
            matched: matched
        }
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
        const left = new GetPropertyInfo('name');
        const right = undefined;

        const matcher = new ExpressionMatcher(undefined, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns value from GetPropertyExpressionMatcher when left and right are GetProperty expressions', ()=> {
        const left = new GetPropertyInfo('left name');
        const right = new GetPropertyInfo('right name');

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const getPropertyExpressionMatcher = ArgumentsMatcherFactory<GetPropertyExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(getPropertyExpressionMatcher, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from GetPropertyExpressionMatcher when left is GetProperty and right is It', ()=> {
        const left = new GetPropertyInfo('name');
        const right = It.Is(()=> {
        });

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const getPropertyExpressionMatcher = ArgumentsMatcherFactory<GetPropertyExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(getPropertyExpressionMatcher, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from SetPropertyExpressionMatcher when left and right are SetProperty expressions', ()=> {
        const left = new SetPropertyInfo('left name', 'left value');
        const right = new SetPropertyInfo('right name', 'right value');

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const setPropertyExpressionMatcher = ArgumentsMatcherFactory<SetPropertyExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, setPropertyExpressionMatcher, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from SetPropertyExpressionMatcher when left is SetProperty and right is It', ()=> {
        const left = new SetPropertyInfo('name', 'value');
        const right = It.Is(()=> {
        });

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const setPropertyExpressionMatcher = ArgumentsMatcherFactory<SetPropertyExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, setPropertyExpressionMatcher, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from MethodExpressionMatcher when left and right are Method expressions', ()=> {
        const left = new MethodInfo([]);
        const right = new MethodInfo([]);

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const methodExpressionMatcher = ArgumentsMatcherFactory<MethodExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, undefined, methodExpressionMatcher, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from MethodExpressionMatcher when left is Method expression and right is It', ()=> {
        const left = new MethodInfo([]);
        const right = It.Is(()=> {
        });

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const methodExpressionMatcher = ArgumentsMatcherFactory<MethodExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, undefined, methodExpressionMatcher, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from NamedMethodExpressionMatcher when left and right are NamedMethod expressions', ()=> {
        const left = new NamedMethodInfo('name', []);
        const right = new NamedMethodInfo('name', []);

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const namedMethodExpressionMatcher = ArgumentsMatcherFactory<NamedMethodExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, undefined, undefined, namedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns value from NamedMethodExpressionMatcher when left is NamedMethod expression and right is It', ()=> {
        const left = new NamedMethodInfo('name', []);
        const right = It.Is(()=> {
        });

        const expected = 'some unique value';
        const matched = jasmine.createSpy('matched').and.returnValue(expected);
        const namedMethodExpressionMatcher = ArgumentsMatcherFactory<NamedMethodExpressionMatcher>(matched);
        const matcher = new ExpressionMatcher(undefined, undefined, undefined, namedMethodExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(expected);
        expect(matched).toHaveBeenCalledWith(left, right);
    });

    it('Returns false when left and right represent different expressions', ()=> {
        const left = new NamedMethodInfo('name', []);
        const right = new GetPropertyInfo('name');

        const matcher = new ExpressionMatcher(undefined, undefined, undefined, undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});