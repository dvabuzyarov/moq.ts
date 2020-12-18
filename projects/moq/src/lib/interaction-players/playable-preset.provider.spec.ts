import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { Interaction } from "../interactions";
import { Presets } from "../presets/presets";
import { PlayablePresetProvider } from "./playable-preset.provider";
import { IPreset } from "../presets/presets/preset";
import { IPlayable } from "../moq";
import { createInjector2, resolve2, resolveMock, SpiedObject } from "../../tests.components/resolve.builder";

describe("Playable preset provider", () => {

    beforeEach(() => {
        createInjector2(PlayablePresetProvider, [Presets, ExpressionMatcher]);
    });

    function createPreset(target: ExpectedExpressions<unknown>): SpiedObject<IPreset<unknown>> {
        const playable = jasmine.createSpyObj<IPlayable>(["isPlayable"]);
        return {target, playable} as any;
    }

    it("Returns playable preset by expression", () => {
        const expectedExpression = {} as ExpectedExpressions<unknown>;
        const expression = {} as Interaction;

        const preset = createPreset(expectedExpression);
        preset.playable.isPlayable.and.returnValue(true);

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, expectedExpression))
            .returns(true);
        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBe(preset);
    });

    it("Returns the first playable preset", () => {
        const expectedExpression = {} as ExpectedExpressions<unknown>;
        const expression = {} as Interaction;

        const preset1 = createPreset(expectedExpression);
        preset1.playable.isPlayable.and.returnValue(true);

        const preset2 = createPreset(expectedExpression);
        preset2.playable.isPlayable.and.returnValue(true);

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, expectedExpression))
            .returns(true);
        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset1, preset2]);

        const provider = resolve2(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBe(preset1);
    });

    it("Skips unplayable preset by expression and returns undefined", () => {
        const expectedExpression = {} as ExpectedExpressions<unknown>;
        const expression = {} as Interaction;

        const preset = createPreset(expectedExpression);
        preset.playable.isPlayable.and.returnValue(false);

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, expectedExpression))
            .returns(true);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Skips preset that expected expression does not match to the interaction expression", () => {
        const expectedExpression = {} as ExpectedExpressions<unknown>;
        const expression = {} as Interaction;

        const preset = createPreset(expectedExpression);
        preset.playable.isPlayable.and.returnValue(true);

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, expectedExpression))
            .returns(false);
        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Does not check playability of a preset when its expected expression does not match to the interaction expression", () => {
        const expectedExpression = {} as ExpectedExpressions<unknown>;
        const expression = {} as Interaction;

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["playable"]);
        (preset as any).target = expectedExpression;

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, expectedExpression))
            .returns(false);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PlayablePresetProvider);
        provider.get(expression);

        expect(preset.playable).not.toHaveBeenCalled();
    });
});
