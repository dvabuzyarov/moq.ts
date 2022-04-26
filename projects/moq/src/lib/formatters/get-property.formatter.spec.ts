import { GetPropertyExpression } from "../reflector/expressions";
import { GetPropertyFormatter } from "./get-property.formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Get property formatter", () => {
    beforeEach(() => {
        createInjector(GetPropertyFormatter, [PropertyKeyFormatter]);
    });

    it("Returns formatted description for get property expression", () => {
        const name = "name";
        const nameDescription = "name description";

        const expression = new GetPropertyExpression(name);

        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(GetPropertyFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`Getter of \'${nameDescription}\'`);
    });

});
