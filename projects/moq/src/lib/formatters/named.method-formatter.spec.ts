import { NamedMethodInteraction } from "../interactions";
import { ConstantFormatter } from "./constant-formatter";
import { NamedMethodExpressionFormatter } from "./named.method-formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";

describe("Named method expression formatter", () => {
    function constantFormatterFactory(): ConstantFormatter {
        const format = jasmine.createSpy("constant formatter");
        return {format};
    }

    function propertyKeyFormatterFactory(): PropertyKeyFormatter {
        const format = jasmine.createSpy("property key format");
        return {format};
    }

    it("Returns formatted description for named method expression", () => {
        const name = "name";
        const value = "value";
        const valueDescription = "value description";
        const nameDescription = "name description";

        const expression = new NamedMethodInteraction(name, [value]);

        const constantFormatter = constantFormatterFactory();
        (<jasmine.Spy>constantFormatter.format).and.returnValue(valueDescription);

        const propertyKeyFormatter = propertyKeyFormatterFactory();
        (<jasmine.Spy>propertyKeyFormatter.format).and.returnValue(nameDescription);

        const formatter = new NamedMethodExpressionFormatter(constantFormatter, propertyKeyFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`${nameDescription}(${valueDescription})`);
        expect(constantFormatter.format).toHaveBeenCalledWith(value);
        expect(propertyKeyFormatter.format).toHaveBeenCalledWith(name);
    });


    it("Returns formatted description for named method expression with several arguments", () => {
        const name = "name";
        const nameDescription = "name description";

        const firstValue = "first value";
        const secondValue = "first value";
        const firstValueDescription = "first value description";
        const secondValueDescription = "second value description";
        const expression = new NamedMethodInteraction(name, [firstValue, secondValue]);

        const propertyKeyFormatter = propertyKeyFormatterFactory();
        (<jasmine.Spy>propertyKeyFormatter.format).and.returnValue(nameDescription);
        const constantFormatter = constantFormatterFactory();
        (<jasmine.Spy>constantFormatter.format).and.returnValues(firstValueDescription, secondValueDescription);

        const formatter = new NamedMethodExpressionFormatter(constantFormatter, propertyKeyFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`${nameDescription}(${firstValueDescription}, ${secondValueDescription})`);
        expect(propertyKeyFormatter.format).toHaveBeenCalledWith(name);
    });

});
