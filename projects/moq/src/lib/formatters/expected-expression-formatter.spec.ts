import { GetPropertyInteraction } from "../interactions";
import { ExpressionFormatter } from "./expression-formatter";
import { ExpectedExpressionFormatter } from "./expected-expression-formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Expected expression message formatter", () => {
    beforeEach(() => {
        createInjector2(ExpectedExpressionFormatter, [ExpressionFormatter]);
    });

    it("Returns formatted description for verify message with mock name", () => {
        const mockName = "mockName";
        const timesMessage = "Should be called once";
        const haveBeenCalledTimes = 2;
        const expressionDescription = "expression description";

        const expression = new GetPropertyInteraction("name");

        resolveMock(ExpressionFormatter)
            .setup(instance => instance.format(expression))
            .returns(expressionDescription);

        const formatter = resolve2(ExpectedExpressionFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes, mockName);

        const but = `, but was called ${haveBeenCalledTimes} time(s)`;
        const expected = `${expressionDescription} of ${mockName} ${timesMessage.toLowerCase()}${but}`;
        expect(actual).toBe(expected);
    });

    it("Returns formatted description for verify message without mock name", () => {
        const timesMessage = "Should be called once";
        const haveBeenCalledTimes = 2;
        const expressionDescription = "expression description";
        const expression = new GetPropertyInteraction("name");

        resolveMock(ExpressionFormatter)
            .setup(instance => instance.format(expression))
            .returns(expressionDescription);

        const formatter = resolve2(ExpectedExpressionFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes);

        expect(actual).toBe(`${expressionDescription} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`);
    });

});
