import { GetPropertyInteraction, NamedMethodInteraction } from "../interactions";
import { ExpressionFormatter } from "./expression-formatter";
import { TrackedExpressionsFormatter } from "./tracked-expressions-formatter";
import { nameof } from "../../tests.components/nameof";

describe("Tracked expression message formatter", () => {
    function expressionFormatterFactory(): ExpressionFormatter {
        return jasmine.createSpyObj("expression formatter", [nameof<ExpressionFormatter>("format")]);
    }

    it("Returns formatted description of tracked expressions", () => {
        const getPropertyExpressionDescription = "GetProperty Name";
        const namedMethodExpressionDescription = "NamedMethod Name";
        const getPropertyExpression = new GetPropertyInteraction("name");
        const namedMethodExpression = new NamedMethodInteraction("name", []);

        const expressionFormatter = expressionFormatterFactory();

        (<jasmine.Spy>expressionFormatter.format).and.callFake(value => {
            if (value === getPropertyExpression) {
                return getPropertyExpressionDescription;
            }
            if (value === namedMethodExpression) {
                return namedMethodExpressionDescription;
            }
        });

        const formatter = new TrackedExpressionsFormatter(expressionFormatter);
        const actual = formatter.format([getPropertyExpression, namedMethodExpression]);

        expect(actual).toBe(`${getPropertyExpressionDescription}\n${namedMethodExpressionDescription}`);
        expect(expressionFormatter.format).toHaveBeenCalledWith(getPropertyExpression);
        expect(expressionFormatter.format).toHaveBeenCalledWith(namedMethodExpression);
    });
});
