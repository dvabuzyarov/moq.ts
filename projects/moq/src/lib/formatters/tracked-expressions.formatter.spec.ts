import { GetPropertyExpression, MethodExpression } from "../reflector/expressions";
import { InteractionFormatter } from "./interaction.formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions.formatter";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Tracked expressions formatter", () => {
    beforeEach(() => {
        createInjector(TrackedExpressionsFormatter, [InteractionFormatter]);
    });

    it("Returns formatted description of tracked expressions", () => {
        const getPropertyExpressionDescription = "GetProperty Name";
        const namedMethodExpressionDescription = "NamedMethod Name";
        const getPropertyExpression = new GetPropertyExpression("name");
        const namedMethodExpression = new MethodExpression("name", []);

        resolveMock(InteractionFormatter)
            .setup(instance => instance.format(getPropertyExpression))
            .returns(getPropertyExpressionDescription)
            .setup(instance => instance.format(namedMethodExpression))
            .returns(namedMethodExpressionDescription);

        const formatter = resolve2(TrackedExpressionsFormatter);
        const actual = formatter.format([getPropertyExpression, namedMethodExpression]);

        expect(actual).toBe(`${getPropertyExpressionDescription}\n${namedMethodExpressionDescription}`);
    });
});
