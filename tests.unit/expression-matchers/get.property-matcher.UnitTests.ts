import {GetPropertyExpression} from '../../lib/expressions';
import {GetPropertyExpressionMatcher} from '../../lib/expression-matchers/get.property-matcher';
import {It} from '../../lib/expected-expressions/expression-predicates';
import {ExpectedGetPropertyExpression} from '../../lib/expected-expressions/expected-expressions';

describe('Get property expression matcher', () => {

    it('Returns true when they are equal', ()=> {
        const name = 'name';
        const left = new GetPropertyExpression(name);
        const right = new ExpectedGetPropertyExpression(name);

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when right is predicate that returns true', ()=> {
        const name = 'name';
        const left = new GetPropertyExpression(name);

        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns false when left does not equal to right', ()=> {
        const left = new GetPropertyExpression('left name');
        const right = new ExpectedGetPropertyExpression('right name');

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when right is predicate that returns false', ()=> {
        const name = 'name';
        const left = new GetPropertyExpression(name);
        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});