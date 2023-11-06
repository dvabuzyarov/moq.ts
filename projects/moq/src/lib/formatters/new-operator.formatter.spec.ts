import { NewOperatorExpression } from "../reflector/expressions";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { NewOperatorFormatter } from "./new-operator.formatter";
import { ObjectFormatter } from "../object-formatters/object.formatter";

describe("New operator formatter", () => {
    beforeEach(() => {
        createInjector(NewOperatorFormatter, [ObjectFormatter]);
    });

    it("Returns formatted description for method expression", () => {
        const value = ["value"];
        const valueDescription = "value description";
        const expression = new NewOperatorExpression(value);

        resolveMock(ObjectFormatter)
            .setup(instance => instance.format(value))
            .returns(valueDescription);

        const formatter = resolve2(NewOperatorFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`new constructor(${valueDescription})`);
    });
});
