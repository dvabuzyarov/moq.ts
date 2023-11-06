import { SetPropertyExpression } from "../reflector/expressions";
import { SetPropertyFormatter } from "./set-property.formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ObjectFormatter } from "../object-formatters/object.formatter";

describe("Set property formatter", () => {
    beforeEach(() => {
        createInjector(SetPropertyFormatter, [ObjectFormatter, PropertyKeyFormatter]);
    });

    it("Returns formatted description for set property expression", () => {
        const name = "name";
        const value = "value";
        const nameDescription = "name description";
        const valueDescription = "value description";
        const expression = new SetPropertyExpression(name, value);

        resolveMock(ObjectFormatter)
            .setup(instance => instance.format(value))
            .returns(valueDescription);
        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(SetPropertyFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`Assignment of ${valueDescription} to property \'${nameDescription}\'`);
    });

});
