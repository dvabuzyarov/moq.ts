import {It} from '../lib/expression-predicates';
import {MethodInfo} from '../lib/expression-reflector';
import {IArgumentsMatcher} from '../lib/arguments-matcher';
import {MethodExpressionMatcher} from '../lib/method.expression-matcher';

describe('Method expression matcher', () => {

    function ArgumentsMatcherFactory(matched?: (left: any[], right: (any|It<any>)[])=> boolean): IArgumentsMatcher {
        return {
            matched: matched
        }
    }

    it('Returns true when both are the same object', ()=> {
        const expressionInfo = new MethodInfo([]);

        const matcher = new MethodExpressionMatcher(ArgumentsMatcherFactory(undefined));
        const actual = matcher.matched(expressionInfo, expressionInfo);

        expect(actual).toBe(true);
    });


    it('Returns true when they are equal', ()=> {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodInfo(arguments1);
        const right = new MethodInfo(arguments2);

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(arguments1);
            expect(rvalue).toBe(arguments2);
            return true;
        };

        const matcher = new MethodExpressionMatcher(ArgumentsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when right is predicate that returns true', ()=> {
        const left = new MethodInfo([]);

        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new MethodExpressionMatcher(ArgumentsMatcherFactory(undefined));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns false when left does not equal to right', ()=> {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodInfo(arguments1);
        const right = new MethodInfo(arguments2);

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(arguments1);
            expect(rvalue).toBe(arguments2);
            return false;
        };

        const matcher = new MethodExpressionMatcher(ArgumentsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when right is predicate that returns false', ()=> {
        const left = new MethodInfo([]);
        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new MethodExpressionMatcher(ArgumentsMatcherFactory(undefined));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});