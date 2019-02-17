import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { ExpressionMatcher } from "../expression-matchers/expression-matcher";
import { Expressions } from "../expressions";
import { Presets2 } from "../preset/presets2";
import { InteractionPresetProvider } from "./interaction-preset.provider";
import { IPreset } from "../presets/preset";

describe("Interaction preset provider", () => {

    it("Returns playable preset by expression", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Expressions>{};

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset).target = expectedExpression;
        preset.invocable.and.returnValue(true);

        const matcher = jasmine.createSpyObj<ExpressionMatcher>(["matched"]);
        matcher.matched.withArgs(expression, expectedExpression).and.returnValue(true);

        const presets = jasmine.createSpyObj<Presets2<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const provider = new InteractionPresetProvider<unknown>(presets, matcher);
        const actual = provider.get(expression);

        expect(actual).toBe(preset);
    });

    it("Returns the first playable preset", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Expressions>{};

        const preset1 = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset1).target = expectedExpression;
        preset1.invocable.and.returnValue(true);

        const preset2 = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset2).target = expectedExpression;
        preset2.invocable.and.returnValue(true);

        const matcher = jasmine.createSpyObj<ExpressionMatcher>(["matched"]);
        matcher.matched.withArgs(expression, expectedExpression).and.returnValue(true);

        const presets = jasmine.createSpyObj<Presets2<unknown>>(["get"]);
        presets.get.and.returnValue([preset1, preset2]);

        const provider = new InteractionPresetProvider<unknown>(presets, matcher);
        const actual = provider.get(expression);

        expect(actual).toBe(preset1);
    });

    it("Skips unplayable preset by expression and returns undefined", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Expressions>{};

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset).target = expectedExpression;
        preset.invocable.and.returnValue(false);

        const matcher = jasmine.createSpyObj<ExpressionMatcher>(["matched"]);
        matcher.matched.withArgs(expression, expectedExpression).and.returnValue(true);

        const presets = jasmine.createSpyObj<Presets2<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const provider = new InteractionPresetProvider<unknown>(presets, matcher);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Skips preset that expected expression does not match to the interaction expression", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Expressions>{};

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset).target = expectedExpression;
        preset.invocable.and.returnValue(true);

        const matcher = jasmine.createSpyObj<ExpressionMatcher>(["matched"]);
        matcher.matched.withArgs(expression, expectedExpression).and.returnValue(false);

        const presets = jasmine.createSpyObj<Presets2<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const provider = new InteractionPresetProvider<unknown>(presets, matcher);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Does not check playability of a preset when its expected expression does not match to the interaction expression", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Expressions>{};

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset).target = expectedExpression;

        const matcher = jasmine.createSpyObj<ExpressionMatcher>(["matched"]);
        matcher.matched.withArgs(expression, expectedExpression).and.returnValue(false);

        const presets = jasmine.createSpyObj<Presets2<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const provider = new InteractionPresetProvider<unknown>(presets, matcher);
        provider.get(expression);

        expect(preset.invocable).not.toHaveBeenCalled();
    });
});
