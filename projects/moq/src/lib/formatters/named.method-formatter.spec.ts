import { NamedMethodInteraction } from "../interactions";
import { ConstantFormatter } from "./constant-formatter";
import { NamedMethodExpressionFormatter } from "./named.method-formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Named method expression formatter", () => {
    beforeEach(() => {
        createInjector2(NamedMethodExpressionFormatter, [ConstantFormatter, PropertyKeyFormatter]);
    });

    it("Returns formatted description for named method expression", () => {
        const name = "name";
        const value = "value";
        const valueDescription = "value description";
        const nameDescription = "name description";

        const expression = new NamedMethodInteraction(name, [value]);

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(value))
            .returns(valueDescription);
        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(NamedMethodExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`${nameDescription}(${valueDescription})`);
    });


    it("Returns formatted description for named method expression with several arguments", () => {
        const name = "name";
        const nameDescription = "name description";

        const firstValue = "first value";
        const secondValue = "second value";
        const firstValueDescription = "first value description";
        const secondValueDescription = "second value description";
        const expression = new NamedMethodInteraction(name, [firstValue, secondValue]);

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(firstValue))
            .returns(firstValueDescription)
            .setup(instance => instance.format(secondValue))
            .returns(secondValueDescription);
        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(NamedMethodExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`${nameDescription}(${firstValueDescription}, ${secondValueDescription})`);
    });

});
