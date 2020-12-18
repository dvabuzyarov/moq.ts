import { MethodInteraction } from "../interactions";
import { ConstantFormatter } from "./constant-formatter";
import { MethodExpressionFormatter } from "./method-formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Method expression formatter", () => {
    beforeEach(() => {
        createInjector2(MethodExpressionFormatter, [ConstantFormatter]);
    });

    it("Returns formatted description for method expression", () => {
        const value = ["value"];
        const valueDescription = "value description";
        const expression = new MethodInteraction(value);

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(value))
            .returns(valueDescription);

        const formatter = resolve2(MethodExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`(${valueDescription})`);
    });
});
