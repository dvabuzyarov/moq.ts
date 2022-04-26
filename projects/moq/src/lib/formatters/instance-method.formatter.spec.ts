import { MethodExpression } from "../reflector/expressions";
import { ConstantFormatter } from "./constant.formatter";
import { MethodFormatter } from "./method.formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Instance method formatter", () => {
    beforeEach(() => {
        createInjector(MethodFormatter, [ConstantFormatter, PropertyKeyFormatter]);
    });

    it("Returns formatted description for named method expression", () => {
        const name = "name";
        const value = "value";
        const valueDescription = "value description";
        const nameDescription = "name description";

        const expression = new MethodExpression(name, [value]);

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(value))
            .returns(valueDescription);
        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(MethodFormatter);
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
        const expression = new MethodExpression(name, [firstValue, secondValue]);

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(firstValue))
            .returns(firstValueDescription)
            .setup(instance => instance.format(secondValue))
            .returns(secondValueDescription);
        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(name))
            .returns(nameDescription);

        const formatter = resolve2(MethodFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`${nameDescription}(${firstValueDescription}, ${secondValueDescription})`);
    });

});
