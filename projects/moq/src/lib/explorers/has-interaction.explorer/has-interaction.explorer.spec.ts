import { HasInteractionExplorer } from "./has-interaction.explorer";
import { IPreset } from "../../presets/preset";
import { Presets } from "../../preset/presets";
import { ExpressionMatcher } from "../../expression-matchers/expression-matcher";
import { GetPropertyExpression } from "../../expressions";
import { ExpectedGetPropertyExpression } from "../../expected-expressions/expected-expressions";

describe("Has interaction explorer", () => {

    it("Returns true when there is an interaction", () => {
        const name = "name";
        const expression = new GetPropertyExpression(name);
        const target = new ExpectedGetPropertyExpression(name);
        const preset = <IPreset<unknown>>{target};

        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const expressionMatcher = jasmine.createSpyObj<ExpressionMatcher>("", ["matched"]);
        expressionMatcher.matched.withArgs(expression, target).and.returnValue(true);

        const explorer = new HasInteractionExplorer(presets, expressionMatcher);
        const actual = explorer.has(expression);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no property", () => {
        const name = "name";
        const expression = new GetPropertyExpression(name);
        const target = new ExpectedGetPropertyExpression(name);
        const preset = <IPreset<unknown>>{target};

        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const expressionMatcher = jasmine.createSpyObj<ExpressionMatcher>("", ["matched"]);
        expressionMatcher.matched.withArgs(expression, target).and.returnValue(false);

        const explorer = new HasInteractionExplorer(presets, expressionMatcher);
        const actual = explorer.has(expression);

        expect(actual).toBe(false);
    });
});
