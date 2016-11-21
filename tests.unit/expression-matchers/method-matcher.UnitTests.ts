import {It} from '../../lib/expected-expressions/expression-predicates';
import {ArgumentsMatcher} from '../../lib/expression-matchers/arguments-matcher';
import {MethodExpression} from '../../lib/expressions';
import {ExpectedMethodExpression} from '../../lib/expected-expressions/expected-expressions';
import {MethodExpressionMatcher} from '../../lib/expression-matchers/method-matcher';

describe('Method expression matcher', () => {

    function argumentsMatcherFactory(matched?: (left: any[], right: (any|It<any>)[])=> boolean): ArgumentsMatcher {
        return (<any>{
            matched: matched
        } as ArgumentsMatcher)
    }

    it('Returns true when they are equal', ()=> {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodExpression(arguments1);
        const right = new ExpectedMethodExpression(arguments2);

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(arguments1);
            expect(rvalue).toBe(arguments2);
            return true;
        };

        const matcher = new MethodExpressionMatcher(argumentsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when right is predicate that returns true', ()=> {
        const left = new MethodExpression([]);

        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new MethodExpressionMatcher(argumentsMatcherFactory(undefined));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns false when left does not equal to right', ()=> {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodExpression(arguments1);
        const right = new ExpectedMethodExpression(arguments2);

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(arguments1);
            expect(rvalue).toBe(arguments2);
            return false;
        };

        const matcher = new MethodExpressionMatcher(argumentsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when right is predicate that returns false', ()=> {
        const left = new MethodExpression([]);
        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new MethodExpressionMatcher(argumentsMatcherFactory(undefined));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});