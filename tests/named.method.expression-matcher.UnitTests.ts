import {It} from '../lib/expression-predicates';
import {NamedMethodInfo} from '../lib/expression-reflector';
import {IArgumentsMatcher} from '../lib/arguments-matcher';
import {NamedMethodExpressionMatcher} from '../lib/named.method.expression-matcher';

describe('Named method expression matcher', () => {

    function ArgumentsMatcherFactory(matched?: (left: any[], right: (any|It<any>)[])=> boolean): IArgumentsMatcher {
        return {
            matched: matched
        }
    }

    it('Returns true when both are the same object', ()=> {
        const expressionInfo = new NamedMethodInfo('name', []);

        const matcher = new NamedMethodExpressionMatcher(ArgumentsMatcherFactory(undefined));
        const actual = matcher.matched(expressionInfo, expressionInfo);

        expect(actual).toBe(true);
    });


    it('Returns true when they are equal', ()=> {
        const arguments1 = [];
        const arguments2 = [];

        const name = 'name';
        const left = new NamedMethodInfo(name, arguments1);
        const right = new NamedMethodInfo(name, arguments2);

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(arguments1);
            expect(rvalue).toBe(arguments2);
            return true;
        };

        const matcher = new NamedMethodExpressionMatcher(ArgumentsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when right is predicate that returns true', ()=> {
        const left = new NamedMethodInfo('name', []);

        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new NamedMethodExpressionMatcher(ArgumentsMatcherFactory(undefined));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns false when left does not equal to right by arguments', ()=> {
        const arguments1 = [];
        const arguments2 = [];

        const name = 'name';
        const left = new NamedMethodInfo(name, arguments1);
        const right = new NamedMethodInfo(name, arguments2);

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(arguments1);
            expect(rvalue).toBe(arguments2);
            return false;
        };

        const matcher = new NamedMethodExpressionMatcher(ArgumentsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when left does not equal to right by name', ()=> {
        const args = [];

        const left = new NamedMethodInfo('left name', args);
        const right = new NamedMethodInfo('right name', args);

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(args);
            expect(rvalue).toBe(args);
            return true;
        };

        const matcher = new NamedMethodExpressionMatcher(ArgumentsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when right is predicate that returns false', ()=> {
        const left = new NamedMethodInfo('name', []);
        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new NamedMethodExpressionMatcher(ArgumentsMatcherFactory(undefined));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});