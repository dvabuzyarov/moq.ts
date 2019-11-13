import { GetPropertyInteraction } from "../interactions";
import { VerifyFormatter } from "./verify-formatter";
import { ExpectedExpressionFormatter } from "./expected-expression-formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions-formatter";
import { nameof } from "../../tests.components/nameof";

describe("Verify message formatter", () => {
    function expectedExpressionFormatterFactory(): ExpectedExpressionFormatter {
        return jasmine.createSpyObj("expected expression formatter", [nameof<ExpectedExpressionFormatter>("format")]);
    }

    function trackedExpressionsFormatterFactory(): TrackedExpressionsFormatter {
        return jasmine.createSpyObj("tracked expressions formatter", [nameof<TrackedExpressionsFormatter>("format")]);
    }

    it("Returns formatted description for a verify assertion", () => {
        const mockName = "mockName";
        const timesMessage = "Should be called once";
        const haveBeenCalledTimes = 2;
        const expressionDescription = "expression description";
        const trackedExpressionsDescription = "tracked expressions description";
        const trackedExpressions = [];

        const expression = new GetPropertyInteraction("name");
        const expectedExpressionFormatter = expectedExpressionFormatterFactory();

        (<jasmine.Spy>expectedExpressionFormatter.format).and.returnValue(expressionDescription);
        const trackedExpressionsFormatter = trackedExpressionsFormatterFactory();

        (<jasmine.Spy>trackedExpressionsFormatter.format).and.returnValue(trackedExpressionsDescription);
        const formatter = new VerifyFormatter(expectedExpressionFormatter, trackedExpressionsFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes, trackedExpressions, mockName);

        const delimiter = `-------------------------------------`;
        const title = `Tracked calls:`;
        expect(actual).toBe(`${expressionDescription}\n${delimiter}\n${title}\n${trackedExpressionsDescription}\n${delimiter}\n`);
        expect(expectedExpressionFormatter.format).toHaveBeenCalledWith(expression, timesMessage, haveBeenCalledTimes, mockName);
        expect(trackedExpressionsFormatter.format).toHaveBeenCalledWith(trackedExpressions);
    });

});
