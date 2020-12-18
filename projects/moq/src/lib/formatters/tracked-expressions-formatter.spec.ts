import { GetPropertyInteraction, NamedMethodInteraction } from "../interactions";
import { ExpressionFormatter } from "./expression-formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions-formatter";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Tracked expression message formatter", () => {
    beforeEach(() => {
        createInjector2(TrackedExpressionsFormatter, [ExpressionFormatter]);
    });

    it("Returns formatted description of tracked expressions", () => {
        const getPropertyExpressionDescription = "GetProperty Name";
        const namedMethodExpressionDescription = "NamedMethod Name";
        const getPropertyExpression = new GetPropertyInteraction("name");
        const namedMethodExpression = new NamedMethodInteraction("name", []);

        resolveMock(ExpressionFormatter)
            .setup(instance => instance.format(getPropertyExpression))
            .returns(getPropertyExpressionDescription)
            .setup(instance => instance.format(namedMethodExpression))
            .returns(namedMethodExpressionDescription);

        const formatter = resolve2(TrackedExpressionsFormatter);
        const actual = formatter.format([getPropertyExpression, namedMethodExpression]);

        expect(actual).toBe(`${getPropertyExpressionDescription}\n${namedMethodExpressionDescription}`);
    });
});
