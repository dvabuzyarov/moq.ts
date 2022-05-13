import { ExpressionHasPropertyExplorer } from "./expression-has-property.explorer";
import { It } from "../../reflector/expression-predicates";
import {
    GetPropertyExpression,
    InOperatorExpression,
    FunctionExpression,
    MethodExpression,
    SetPropertyExpression
} from "../../reflector/expressions";

describe("Expression has property explorer", () => {

    it("Returns true when expression is read property interaction", () => {
        const name = "name";
        const expression = new GetPropertyExpression(name);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(true);
    });

    it("Returns false when expression is read property interaction with different name", () => {
        const name = "name";
        const expression = new GetPropertyExpression("other name");

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns true when expression is write property interaction", () => {
        const name = "name";
        const expression = new SetPropertyExpression(name, undefined);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(true);
    });

    it("Returns false when expression is write property interaction with different name", () => {
        const name = "name";
        const expression = new SetPropertyExpression("other name", undefined);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns false when expression is instance method interaction", () => {
        const name = "name";
        const expression = new MethodExpression(name, undefined);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns false when expression is instance method interaction with different name", () => {
        const name = "name";
        const expression = new MethodExpression("other name", undefined);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });

    it("Returns false when expression is method interaction", () => {
        const name = "name";
        const expression = new FunctionExpression(undefined);

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

    it("Returns false when expression is In operator", () => {
        const name = "name";
        const expression = new InOperatorExpression(name);

        const explorer = new ExpressionHasPropertyExplorer();
        const actual = explorer.has(name, expression);

        expect(actual).toBe(false);
    });
});
