import { GetPropertyExpression } from "../expressions";
import { ExpressionFormatter } from "./expression-formatter";
import { ExpectedExpressionFormatter } from "./expected-expression-formatter";
import { nameof } from "../../tests.components/nameof";

describe("Expected expression message formatter", () => {
    function expressionFormatterFactory(): ExpressionFormatter {
        return jasmine.createSpyObj("expression formatter", [nameof<ExpressionFormatter>("format")]);
    }

    it("Returns formatted description for verify message with mock name", () => {
        const mockName = "mockName";
        const timesMessage = "Should be called once";
        const haveBeenCalledTimes = 2;
        const expressionDescription = "expression description";

        const expression = new GetPropertyExpression("name");
        const expressionFormatter = expressionFormatterFactory();

        (<jasmine.Spy>expressionFormatter.format).and.returnValue(expressionDescription);

        const formatter = new ExpectedExpressionFormatter(expressionFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes, mockName);

        const but = `, but was called ${haveBeenCalledTimes} time(s)`;
        const expected = `${expressionDescription} of ${mockName} ${timesMessage.toLowerCase()}${but}`;
        expect(actual).toBe(expected);
        expect(expressionFormatter.format).toHaveBeenCalledWith(expression);
    });

    it("Returns formatted description for verify message without mock name", () => {
        const timesMessage = "Should be called once";
        const haveBeenCalledTimes = 2;
        const expressionDescription = "expression description";

        const expression = new GetPropertyExpression("name");
        const expressionFormatter = expressionFormatterFactory();

        (<jasmine.Spy>expressionFormatter.format).and.returnValue(expressionDescription);

        const formatter = new ExpectedExpressionFormatter(expressionFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes);

        expect(actual).toBe(`${expressionDescription} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`);
        expect(expressionFormatter.format).toHaveBeenCalledWith(expression);
    });

});
