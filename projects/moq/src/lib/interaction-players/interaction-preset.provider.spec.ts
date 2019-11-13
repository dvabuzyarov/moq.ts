import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { ExpressionMatcher } from "../expression-matchers/expression-matcher";
import { Interactions } from "../interactions";
import { Presets } from "../preset/presets";
import { InteractionPresetProvider } from "./interaction-preset.provider";
import { IPreset } from "../presets/preset";
import { resolveBuilder } from "../../tests.components/resolve.builder";
import { PlayOptions } from "../moq";

describe("Interaction preset provider", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        const matcher = jasmine.createSpyObj<ExpressionMatcher>(["matched"]);
        resolve = resolveBuilder([
            [Presets, presets],
            [ExpressionMatcher, matcher],
            [InteractionPresetProvider, new InteractionPresetProvider(presets, matcher)]
        ]);
    });

    it("Returns playable preset by expression", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interactions>{};

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset).target = expectedExpression;
        preset.invocable.and.returnValue(true);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(true);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(InteractionPresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBe(preset);
    });

    it("Returns the first playable preset", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interactions>{};

        const preset1 = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset1).target = expectedExpression;
        preset1.invocable.and.returnValue(true);

        const preset2 = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset2).target = expectedExpression;
        preset2.invocable.and.returnValue(true);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(true);

        resolve(Presets)
            .get.and.returnValue([preset1, preset2]);

        const provider = resolve(InteractionPresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBe(preset1);
    });

    it("Skips unplayable preset by expression and returns undefined", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interactions>{};

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset).target = expectedExpression;
        preset.invocable.and.returnValue(false);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(true);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(InteractionPresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Skips preset that expected expression does not match to the interaction expression", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interactions>{};

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset).target = expectedExpression;
        preset.invocable.and.returnValue(true);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(false);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(InteractionPresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Does not check playability of a preset when its expected expression does not match to the interaction expression", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interactions>{};

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["invocable"]);
        (<any>preset).target = expectedExpression;

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(false);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(InteractionPresetProvider);
        provider.get(expression);

        expect(preset.invocable).not.toHaveBeenCalled();
    });
});
