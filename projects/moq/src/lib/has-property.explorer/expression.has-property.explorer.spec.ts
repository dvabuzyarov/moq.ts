import { ExpressionHasPropertyExplorer } from "./expression-has-property.explorer";
import {
    ExpectedGetPropertyExpression,
    ExpectedMethodExpression,
    ExpectedNamedMethodExpression,
    ExpectedSetPropertyExpression
} from "../expected-expressions/expected-expressions";
import { It } from "../expected-expressions/expression-predicates";

describe("Expression has property explorer", () => {

    it("Returns true when expression is read property interaction", () => {
        const name = "name";
        const expression = new ExpectedGetPropertyExpression(name);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(true);
    });

    it("Returns false when expression is read property interaction with different name", () => {
        const name = "name";
        const expression = new ExpectedGetPropertyExpression("other name");

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns true when expression is write property interaction", () => {
        const name = "name";
        const expression = new ExpectedSetPropertyExpression(name, undefined);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(true);
    });

    it("Returns false when expression is write property interaction with different name", () => {
        const name = "name";
        const expression = new ExpectedSetPropertyExpression("other name", undefined);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns true when expression is instance method interaction", () => {
        const name = "name";
        const expression = new ExpectedNamedMethodExpression(name, undefined);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(true);
    });

    it("Returns false when expression is instance method interaction with different name", () => {
        const name = "name";
        const expression = new ExpectedNamedMethodExpression("other name", undefined);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns false when expression is method interaction", () => {
        const name = "name";
        const expression = new ExpectedMethodExpression(undefined);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns false when expression is It", () => {
        const name = "name";
        const expression = It.IsAny();

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });
});
