import { NewOperatorInteraction } from "../interactions";
import { ConstantFormatter } from "./constant.formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { NewOperatorFormatter } from "./new-operator.formatter";

describe("New operator formatter", () => {
    beforeEach(() => {
        createInjector2(NewOperatorFormatter, [ConstantFormatter]);
    });

    it("Returns formatted description for method expression", () => {
        const value = ["value"];
        const valueDescription = "value description";
        const expression = new NewOperatorInteraction(value);

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(value))
            .returns(valueDescription);

        const formatter = resolve2(NewOperatorFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`new constructor(${valueDescription})`);
    });
});
