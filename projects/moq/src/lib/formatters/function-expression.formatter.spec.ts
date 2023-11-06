import { FunctionExpression } from "../reflector/expressions";
import { FunctionExpressionFormatter } from "./function-expression.formatter";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ObjectFormatter } from "../object-formatters/object.formatter";

describe("Function expression formatter", () => {
    beforeEach(() => {
        createInjector(FunctionExpressionFormatter, [ObjectFormatter]);
    });

    it("Returns formatted description for method expression", () => {
        const value = ["value"];
        const valueDescription = "value description";
        const expression = new FunctionExpression(value);

        resolveMock(ObjectFormatter)
            .setup(instance => instance.format(value))
            .returns(valueDescription);

        const formatter = resolve2(FunctionExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`(${valueDescription})`);
    });
});
