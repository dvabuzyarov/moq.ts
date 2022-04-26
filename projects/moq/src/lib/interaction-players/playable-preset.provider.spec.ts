import { Expressions } from "../reflector/expressions";
import { Expression } from "../reflector/expressions";
import { Presets } from "../presets/presets";
import { PlayablePresetProvider } from "./playable-preset.provider";
import { IPreset } from "../presets/presets/preset";
import { IPlayable } from "../moq";
import { createInjector, resolve2, resolveMock, SpiedObject } from "../../tests.components/resolve.builder";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

describe("Playable preset provider", () => {

    beforeEach(() => {
        createInjector(PlayablePresetProvider, [Presets, ExpressionEqualityComparer]);
    });

    function createPreset(target: Expressions<unknown>): SpiedObject<IPreset<unknown>> {
        const playable = jasmine.createSpyObj<IPlayable>(["isPlayable"]);
        return {target, playable} as any;
    }

    it("Returns playable preset by expression", () => {
        const expectedExpression = {} as Expressions<unknown>;
        const expression = {} as Expression;

        const preset = createPreset(expectedExpression);
        preset.playable.isPlayable.and.returnValue(true);

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, expectedExpression))
            .returns(true);
        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBe(preset);
    });

    it("Returns the first playable preset", () => {
        const expectedExpression = {} as Expressions<unknown>;
        const expression = {} as Expression;

        const preset1 = createPreset(expectedExpression);
        preset1.playable.isPlayable.and.returnValue(true);

        const preset2 = createPreset(expectedExpression);
        preset2.playable.isPlayable.and.returnValue(true);

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, expectedExpression))
            .returns(true);
        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset1, preset2]);

        const provider = resolve2(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBe(preset1);
    });

    it("Skips unplayable preset by expression and returns undefined", () => {
        const expectedExpression = {} as Expressions<unknown>;
        const expression = {} as Expression;

        const preset = createPreset(expectedExpression);
        preset.playable.isPlayable.and.returnValue(false);

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, expectedExpression))
            .returns(true);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Skips preset that expected expression does not match to the interaction expression", () => {
        const expectedExpression = {} as Expressions<unknown>;
        const expression = {} as Expression;

        const preset = createPreset(expectedExpression);
        preset.playable.isPlayable.and.returnValue(true);

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, expectedExpression))
            .returns(false);
        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Does not check playability of a preset when its expected expression does not match to the interaction expression", () => {
        const expectedExpression = {} as Expressions<unknown>;
        const expression = {} as Expression;

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["playable"]);
        (preset as any).target = expectedExpression;

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, expectedExpression))
            .returns(false);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PlayablePresetProvider);
        provider.get(expression);

        expect(preset.playable).not.toHaveBeenCalled();
    });
});
