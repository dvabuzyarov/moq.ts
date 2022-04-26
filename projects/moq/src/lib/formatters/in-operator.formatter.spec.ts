import { InOperatorExpression } from "../reflector/expressions";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("In operator formatter", () => {
    beforeEach(() => {
        createInjector(InOperatorFormatter, [PropertyKeyFormatter]);
    });

    it("Returns formatted description for in operator expression", () => {
        const name = "name";
        const nameDescription = "name description";

        const expression = new InOperatorExpression(name);

        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(InOperatorFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`In operator for \'${nameDescription}\'`);
    });

});
