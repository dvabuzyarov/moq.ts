import {It} from '../lib/expression-predicates';
import {GetPropertyExpressionMatcher} from '../lib/get.property.expression-matcher';
import {GetPropertyInfo} from '../lib/expression-reflector';

describe('Get property expression matcher', () => {

    it('Returns true when both are the same object', ()=> {
        const expressionInfo = new GetPropertyInfo('name');

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(expressionInfo, expressionInfo);

        expect(actual).toBe(true);
    });


    it('Returns true when they are equal', ()=> {
        const name = 'name';
        const left = new GetPropertyInfo(name);
        const right = new GetPropertyInfo(name);

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when right is predicate that returns true', ()=> {
        const name = 'name';
        const left = new GetPropertyInfo(name);

        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns false when left does not equal to right', ()=> {
        const left = new GetPropertyInfo('left name');
        const right = new GetPropertyInfo('right name');

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when right is predicate that returns false', ()=> {
        const name = 'name';
        const left = new GetPropertyInfo(name);
        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new GetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});