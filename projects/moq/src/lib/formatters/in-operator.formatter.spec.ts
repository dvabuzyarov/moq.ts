import { InOperatorInteraction } from "../interactions";
import { PropertyKeyFormatter } from "./property-key.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";

describe("In operator expression formatter", () => {
    function propertyKeyFormatterFactory(): PropertyKeyFormatter {
        const format = jasmine.createSpy("property key format");
        return {format};
    }

    it("Returns formatted description for in operator expression", () => {
        const name = "name";
        const nameDescription = "name description";

        const expression = new InOperatorInteraction(name);

        const propertyKeyFormatter = propertyKeyFormatterFactory();
        (<jasmine.Spy>propertyKeyFormatter.format).withArgs(name).and.returnValue(nameDescription);

        const formatter = new InOperatorFormatter(propertyKeyFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`In operator for \'${nameDescription}\'`);
    });

});
