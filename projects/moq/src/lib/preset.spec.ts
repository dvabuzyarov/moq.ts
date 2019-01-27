import { Preset } from "./preset";
import {
    ExpectedExpressions,
    ExpectedGetPropertyExpression,
    ExpectedNamedMethodExpression
} from "./expected-expressions/expected-expressions";
import { ExpressionMatcher } from "./expression-matchers/expression-matcher";
import { Expressions, GetPropertyExpression } from "./expressions";
import { Setup } from "./setup";

describe("List of defined setup", () => {

    function expressionMatcherFactory(matched?: (left: Expressions, right: ExpectedExpressions<any>) => boolean): ExpressionMatcher {
        return (<any>{
            matched: matched
        } as ExpressionMatcher);
    }

    it("Returns playable setup by expression", () => {
        const name = "name";
        const setup = new Setup<any>(undefined);
        setup.play(() => true);

        const expectedGetPropertyExpression = new ExpectedGetPropertyExpression(name);
        const getPropertyExpression = new GetPropertyExpression(name);

        const matcher = (left: Expressions, right: ExpectedExpressions<any>): boolean => {
            expect(left).toBe(getPropertyExpression);
            expect(right).toBe(expectedGetPropertyExpression);
            return true;
        };

        const listSetup = new Preset<any>(expressionMatcherFactory(matcher));
        listSetup.add(expectedGetPropertyExpression, setup);

        const actual = listSetup.get(getPropertyExpression);

        expect(actual).toBe(setup);
    });

    it("Returns the latest setup", () => {
        const name = "name";
        const setup1 = new Setup<any>(undefined);
        setup1.play(() => true);
        const setup2 = new Setup<any>(undefined);
        setup2.play(() => true);
        const expectedGetPropertyExpression = new ExpectedGetPropertyExpression(name);
        const getPropertyExpression = new GetPropertyExpression(name);

        const matcher = (left: Expressions, right: ExpectedExpressions<any>): boolean => {
            expect(left).toBe(getPropertyExpression);
            expect(right).toBe(expectedGetPropertyExpression);
            return true;
        };

        const listSetup = new Preset<any>(expressionMatcherFactory(matcher));
        listSetup.add(expectedGetPropertyExpression, setup1);
        listSetup.add(expectedGetPropertyExpression, setup2);

        const actual = listSetup.get(getPropertyExpression);

        expect(actual).toBe(setup2);
    });

    it("Skips unplayable setup by expression", () => {
        const name = "name";
        const setup = new Setup<any>(undefined);
        setup.play(() => false);

        const expectedGetPropertyExpression = new ExpectedGetPropertyExpression(name);
        const getPropertyExpression = new GetPropertyExpression(name);

        const matcher = (left: Expressions, right: ExpectedExpressions<any>): boolean => {
            expect(left).toBe(getPropertyExpression);
            expect(right).toBe(expectedGetPropertyExpression);
            return true;
        };

        const listSetup = new Preset<any>(expressionMatcherFactory(matcher));
        listSetup.add(expectedGetPropertyExpression, setup);

        const actual = listSetup.get(getPropertyExpression);

        expect(actual).toBeUndefined();
    });

    it("Skips setup that expected expression does not match to an expression", () => {
        const name = "name";
        const setup = new Setup<any>(undefined);
        setup.play(() => true);
        const expectedGetPropertyExpression = new ExpectedGetPropertyExpression(name);
        const getPropertyExpression = new GetPropertyExpression(name);

        const matcher = (left: Expressions, right: ExpectedExpressions<any>): boolean => {
            expect(left).toBe(getPropertyExpression);
            expect(right).toBe(expectedGetPropertyExpression);
            return false;
        };

        const listSetup = new Preset<any>(expressionMatcherFactory(matcher));
        listSetup.add(expectedGetPropertyExpression, setup);

        const actual = listSetup.get(getPropertyExpression);

        expect(actual).toBeUndefined();
    });

    it("Returns true if it has named method", () => {
        const name = "name";
        const expectedNamedMethodExpression = new ExpectedNamedMethodExpression(name, []);

        const listSetup = new Preset<any>(undefined);
        listSetup.add(expectedNamedMethodExpression, undefined);

        const actual = listSetup.hasNamedMethod(name);

        expect(actual).toBe(true);
    });
});
