import {SetPropertyExpression} from '../../lib/expressions';
import {SetPropertyExpressionMatcher} from '../../lib/expression-matchers/set.property-matcher';
import {ExpectedSetPropertyExpression} from '../../lib/expected-expressions/expected-expressions';
import {ConstantMatcher} from '../../lib/expression-matchers/constant-matcher';
import {It} from '../../lib/expected-expressions/expression-predicates';
describe('Set property expression matcher', () => {

    function constantMatcherFactory(matched?: (left: any, right: any|It<any>)=> boolean): ConstantMatcher {
        return {
            matched: matched
        }
    }

    it('Returns true when they are equal', () => {
        const name = 'name';
        const value = 'value';
        const left = new SetPropertyExpression(name, value);
        const right = new ExpectedSetPropertyExpression(name, value);

        const constantMatcher = constantMatcherFactory((left: any, right: any|It<any>): boolean=>{
            expect(left).toBe(value);
            expect(right).toBe(value);
            return true;
        });

        const matcher = new SetPropertyExpressionMatcher(constantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when right is predicate that returns true', () => {
        const left = new SetPropertyExpression('name', 'value');

        const right = It.Is((value) => {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new SetPropertyExpressionMatcher(undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns false when left does not equal to right by name', () => {
        const value = 'value';
        const left = new SetPropertyExpression('left name', value);
        const right = new ExpectedSetPropertyExpression('right name', value);

        const constantMatcher = constantMatcherFactory((left: any, right: any|It<any>): boolean=>{
            expect(left).toBe(value);
            expect(right).toBe(value);
            return true;
        });

        const matcher = new SetPropertyExpressionMatcher(constantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when left does not equal to right by value', () => {
        const name = 'name';
        const leftValue = 'left value';
        const rightValue = 'right value';

        const left = new SetPropertyExpression(name, leftValue);
        const right = new ExpectedSetPropertyExpression(name, rightValue);

        const constantMatcher = constantMatcherFactory((left: any, right: any|It<any>): boolean=>{
            expect(left).toBe(leftValue);
            expect(right).toBe(rightValue);
            return false;
        });

        const matcher = new SetPropertyExpressionMatcher(constantMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when right is predicate that returns false', () => {
        const left = new SetPropertyExpression('name', 'value');
        const right = It.Is((value) => {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new SetPropertyExpressionMatcher(undefined);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});