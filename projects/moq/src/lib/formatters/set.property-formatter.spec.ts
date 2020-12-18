import { SetPropertyInteraction } from "../interactions";
import { SetPropertyExpressionFormatter } from "./set.property-formatter";
import { ConstantFormatter } from "./constant-formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Set property expression formatter", () => {
    beforeEach(() => {
        createInjector2(SetPropertyExpressionFormatter, [ConstantFormatter, PropertyKeyFormatter]);
    });

    it("Returns formatted description for set property expression", () => {
        const name = "name";
        const value = "value";
        const nameDescription = "name description";
        const valueDescription = "value description";
        const expression = new SetPropertyInteraction(name, value);

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(value))
            .returns(valueDescription);
        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(SetPropertyExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`Assignment of ${valueDescription} to property \'${nameDescription}\'`);
    });

});
