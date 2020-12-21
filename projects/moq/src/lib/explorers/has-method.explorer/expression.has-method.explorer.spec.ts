import { ExpressionHasMethodExplorer } from "./expression.has-method.explorer";
import { Expressions, NamedMethodExpression } from "../../reflector/expressions";
import { createInjector2, resolve2 } from "../../../tests.components/resolve.builder";

describe("Expression has instance method explorer", () => {
    beforeEach(() => {
        createInjector2(ExpressionHasMethodExplorer, []);
    });

    it("Returns true when expression is instance method interaction", () => {
        const name = "name";
        const expression = new NamedMethodExpression(name, undefined);

        const explorer = resolve2(ExpressionHasMethodExplorer);
        const actual = explorer.has(name, expression);

        expect(actual).toBe(true);
    });

    it("Returns false when expression is instance method interaction with different name", () => {
        const name = "name";
        const expression = new NamedMethodExpression("other name", undefined);

        const explorer = resolve2(ExpressionHasMethodExplorer);
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns false when expression is not instance method interaction", () => {
        const name = "name";
        const expression = {} as Expressions<unknown>;

        const explorer = resolve2(ExpressionHasMethodExplorer);
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });
});
