import { FunctionExpression } from "../reflector/expressions";
import { ConstantFormatter } from "./constant.formatter";
import { FunctionFormatter } from "./function.formatter";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Function formatter", () => {
    beforeEach(() => {
        createInjector(FunctionFormatter, [ConstantFormatter]);
    });

    it("Returns formatted description for method expression", () => {
        const value = ["value"];
        const valueDescription = "value description";
        const expression = new FunctionExpression(value);

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(value))
            .returns(valueDescription);

        const formatter = resolve2(FunctionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`(${valueDescription})`);
    });
});
