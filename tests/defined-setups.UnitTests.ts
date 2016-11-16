
import {Setup} from '../lib/setup';
import {GetPropertyExpression, Expressions} from '../lib/expressions';
import {
    ExpectedGetPropertyExpression, ExpectedExpressions,
    ExpectedNamedMethodExpression
} from '../lib/expected-expressions/expected-expressions';
import {DefinedSetups} from '../lib/defined-setups';
import {ExpressionMatcher} from '../lib/expression-matchers/expression-matcher';

describe('List of defined setup', () => {

    function expressionMatcherFactory(matched?: (left: Expressions, right: ExpectedExpressions<any>)=> boolean): ExpressionMatcher {
        return (<any>{
            matched: matched
        } as ExpressionMatcher)
    }

    it('Returns setup by expression', ()=> {
        const name = 'name';
        const setup = new Setup<any>(undefined);
        const expectedGetPropertyExpression = new ExpectedGetPropertyExpression(name);
        const getPropertyExpression = new GetPropertyExpression(name);

        const matcher = (left: Expressions, right: ExpectedExpressions<any>): boolean =>{
            expect(left).toBe(getPropertyExpression);
            expect(right).toBe(expectedGetPropertyExpression);
            return true;
        };

        const listSetup = new DefinedSetups<any>(expressionMatcherFactory(matcher));
        listSetup.add(expectedGetPropertyExpression, setup);

        const actual = listSetup.get(getPropertyExpression);

        expect(actual).toBe(setup);
    });

    it('Skips setup that expected expression does not match to an expression', ()=> {
        const name = 'name';
        const setup = new Setup<any>(undefined);
        const expectedGetPropertyExpression = new ExpectedGetPropertyExpression(name);
        const getPropertyExpression = new GetPropertyExpression(name);

        const matcher = (left: Expressions, right: ExpectedExpressions<any>): boolean =>{
            expect(left).toBe(getPropertyExpression);
            expect(right).toBe(expectedGetPropertyExpression);
            return false;
        };

        const listSetup = new DefinedSetups<any>(expressionMatcherFactory(matcher));
        listSetup.add(expectedGetPropertyExpression, setup);

        const actual = listSetup.get(getPropertyExpression);

        expect(actual).toBeUndefined();
    });

    it('Returns true if it has named method', ()=> {
        const name = 'name';
        const expectedNamedMethodExpression = new ExpectedNamedMethodExpression(name, []);

        const listSetup = new DefinedSetups<any>(undefined);
        listSetup.add(expectedNamedMethodExpression, undefined);

        const actual = listSetup.hasNamedMethod(name);

        expect(actual).toBe(true);
    });

});