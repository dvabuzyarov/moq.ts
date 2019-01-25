import {GetPropertyExpression} from "../expressions";
import {GetPropertyExpressionFormatter} from "./get.property-formatter";
import { PropertyKeyFormatter } from "./property-key.formatter";

describe("Get property expression formatter", () => {
    function propertyKeyFormatterFactory(): PropertyKeyFormatter {
        const format = jasmine.createSpy("property key format");
        return {format};
    }

    it("Returns formatted description for get property expression", () => {
        const name = "name";
        const nameDescription = "name description";

        const expression = new GetPropertyExpression(name);

        const propertyKeyFormatter = propertyKeyFormatterFactory();
        (<jasmine.Spy>propertyKeyFormatter.format).and.returnValue(nameDescription);

        const formatter = new GetPropertyExpressionFormatter(propertyKeyFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`Getter of \'${nameDescription}\'`);
        expect(propertyKeyFormatter.format).toHaveBeenCalledWith(name);
    });

});
