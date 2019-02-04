import { ExpressionHasMethodExplorer } from "./expression.has-method.explorer";
import { ExpectedExpressions, ExpectedNamedMethodExpression } from "../expected-expressions/expected-expressions";

describe("Expression has instance method explorer", () => {

    it("Returns true when expression is instance method interaction", () => {
        const name = "name";
        const expression = new ExpectedNamedMethodExpression(name, undefined);

        const explorer = new ExpressionHasMethodExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(true);
    });

    it("Returns false when expression is instance method interaction with different name", () => {
        const name = "name";
        const expression = new ExpectedNamedMethodExpression("other name", undefined);

        const explorer = new ExpressionHasMethodExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns false when expression is not instance method interaction", () => {
        const name = "name";
        const expression = <ExpectedExpressions<unknown>>{};

        const explorer = new ExpressionHasMethodExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });
});
