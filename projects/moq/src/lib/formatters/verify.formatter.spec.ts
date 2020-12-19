import { GetPropertyInteraction } from "../interactions";
import { VerifyFormatter } from "./verify.formatter";
import { ExpressionsFormatter } from "./expressions.formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions.formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Verify formatter", () => {
    beforeEach(() => {
        createInjector2(VerifyFormatter, [ExpressionsFormatter, TrackedExpressionsFormatter]);
    });

    it("Returns formatted description for a verify assertion", () => {
        const mockName = "mockName";
        const timesMessage = "Should be called once";
        const haveBeenCalledTimes = 2;
        const expressionDescription = "expression description";
        const trackedExpressionsDescription = "tracked expressions description";
        const trackedExpressions = [];
        const expression = new GetPropertyInteraction("name");

        resolveMock(ExpressionsFormatter)
            .setup(instance => instance.format(expression, timesMessage, haveBeenCalledTimes, mockName))
            .returns(expressionDescription);
        resolveMock(TrackedExpressionsFormatter)
            .setup(instance => instance.format(trackedExpressions))
            .returns(trackedExpressionsDescription);

        const formatter = resolve2(VerifyFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes, trackedExpressions, mockName);

        const delimiter = "-------------------------------------";
        const title = "Tracked calls:";
        const expected = `${expressionDescription}\n${delimiter}\n${title}\n${trackedExpressionsDescription}\n${delimiter}\n`;
        expect(actual).toBe(expected);
    });

});
