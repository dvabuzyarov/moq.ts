import { InOperatorInteraction } from "../interactions";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("In operator formatter", () => {
    beforeEach(() => {
        createInjector2(InOperatorFormatter, [PropertyKeyFormatter]);
    });

    it("Returns formatted description for in operator expression", () => {
        const name = "name";
        const nameDescription = "name description";

        const expression = new InOperatorInteraction(name);

        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(InOperatorFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`In operator for \'${nameDescription}\'`);
    });

});
