import {It} from '../lib/expression-predicates';
import {SetPropertyInfo} from '../lib/expression-reflector';
import {SetPropertyExpressionMatcher} from '../lib/set.property.expression-matcher';

describe('Set property expression matcher', () => {

    it('Returns true when both are the same object', ()=> {
        const expressionInfo = new SetPropertyInfo('name', 'value');

        const matcher = new SetPropertyExpressionMatcher();
        const actual = matcher.matched(expressionInfo, expressionInfo);

        expect(actual).toBe(true);
    });


    it('Returns true when they are equal', ()=> {
        const name = 'name';
        const value = 'value';
        const left = new SetPropertyInfo(name, value);
        const right = new SetPropertyInfo(name, value);

        const matcher = new SetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when right is predicate that returns true', ()=> {
        const left = new SetPropertyInfo('name', 'value');

        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new SetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns false when left does not equal to right by name', ()=> {
        const value = 'value';
        const left = new SetPropertyInfo('left name', value);
        const right = new SetPropertyInfo('right name', value);

        const matcher = new SetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when left does not equal to right by value', ()=> {
        const name = 'name';
        const left = new SetPropertyInfo(name, 'left value');
        const right = new SetPropertyInfo(name, 'right value');

        const matcher = new SetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when right is predicate that returns false', ()=> {
        const left = new SetPropertyInfo('name', 'value');
        const right = It.Is((value)=> {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new SetPropertyExpressionMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});