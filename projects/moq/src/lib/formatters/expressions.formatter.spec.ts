import { GetPropertyInteraction } from "../interactions";
import { InteractionFormatter } from "./interaction.formatter";
import { ExpressionsFormatter } from "./expressions.formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Expressions formatter", () => {
    beforeEach(() => {
        createInjector2(ExpressionsFormatter, [InteractionFormatter]);
    });

    it("Returns formatted description for verify message with mock name", () => {
        const mockName = "mockName";
        const timesMessage = "Should be called once";
        const haveBeenCalledTimes = 2;
        const expressionDescription = "expression description";

        const expression = new GetPropertyInteraction("name");

        resolveMock(InteractionFormatter)
            .setup(instance => instance.format(expression))
            .returns(expressionDescription);

        const formatter = resolve2(ExpressionsFormatter);
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

        resolveMock(InteractionFormatter)
            .setup(instance => instance.format(expression))
            .returns(expressionDescription);

        const formatter = resolve2(ExpressionsFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes);

        expect(actual).toBe(`${expressionDescription} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`);
    });

});
