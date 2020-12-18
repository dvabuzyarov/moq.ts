import { GetPropertyInteraction } from "../interactions";
import { GetPropertyExpressionFormatter } from "./get.property-formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Get property expression formatter", () => {
    beforeEach(() => {
        createInjector2(GetPropertyExpressionFormatter, [PropertyKeyFormatter]);
    });

    it("Returns formatted description for get property expression", () => {
        const name = "name";
        const nameDescription = "name description";

        const expression = new GetPropertyInteraction(name);

        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(GetPropertyExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`Getter of \'${nameDescription}\'`);
    });

});
