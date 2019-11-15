import { SetPropertyInteraction } from "../interactions";
import { SetPropertyExpressionFormatter } from "./set.property-formatter";
import { ConstantFormatter } from "./constant-formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";

describe("Set property expression formatter", () => {
    function constantFormatterFactory(): ConstantFormatter {
        const format = jasmine.createSpy("constant formatter");
        return {format};
    }

    function propertyKeyFormatterFactory(): PropertyKeyFormatter {
        const format = jasmine.createSpy("property key format");
        return {format};
    }

    it("Returns formatted description for set property expression", () => {
        const name = "name";
        const value = "value";
        const nameDescription = "name description";
        const valueDescription = "value description";
        const expression = new SetPropertyInteraction(name, value);

        const constantFormatter = constantFormatterFactory();
        (<jasmine.Spy>constantFormatter.format).and.returnValue(valueDescription);

        const propertyKeyFormatter = propertyKeyFormatterFactory();
        (<jasmine.Spy>propertyKeyFormatter.format).and.returnValue(nameDescription);

        const formatter = new SetPropertyExpressionFormatter(constantFormatter, propertyKeyFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`Assignment of ${valueDescription} to property \'${nameDescription}\'`);
        expect(constantFormatter.format).toHaveBeenCalledWith(value);
        expect(propertyKeyFormatter.format).toHaveBeenCalledWith(name);
    });

});
