import { ExpressionHasMethodExplorer } from "./expression.has-method.explorer";
import { Expressions } from "../../reflector/expressions";
import { createInjector, resolve2 } from "../../../tests.components/resolve.builder";
import { MethodExpression } from "../../reflector/expressions";

describe("Expression has instance method explorer", () => {
    beforeEach(() => {
        createInjector(ExpressionHasMethodExplorer, []);
    });

    it("Returns true when expression is instance method interaction", () => {
        const name = "name";
        const expression = new MethodExpression(name, undefined);

        const explorer = resolve2(ExpressionHasMethodExplorer);
        const actual = explorer.has(name, expression);

        expect(actual).toBe(true);
    });

    it("Returns false when expression is instance method interaction with different name", () => {
        const name = "name";
        const expression = new MethodExpression("other name", undefined);

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
