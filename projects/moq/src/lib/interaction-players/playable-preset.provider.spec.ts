import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { Interaction } from "../interactions";
import { Presets } from "../presets/presets";
import { PlayablePresetProvider } from "./playable-preset.provider";
import { IPreset } from "../presets/presets/preset";
import { createInjector, resolve, SpiedObject } from "../../tests.components/resolve.builder";
import { IPlayable } from "../moq";

describe("Playable preset provider", () => {

    beforeEach(() => {
        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        const matcher = jasmine.createSpyObj<ExpressionMatcher>(["matched"]);

        createInjector([
            {provide: Presets, useValue: presets, deps: []},
            {provide: ExpressionMatcher, useValue: matcher, deps: []},
            {provide: PlayablePresetProvider, useClass: PlayablePresetProvider, deps: [Presets, ExpressionMatcher]},
        ]);
    });

    function createPreset(target: ExpectedExpressions<unknown>): SpiedObject<IPreset<unknown>> {
        const playable = jasmine.createSpyObj<IPlayable>(["isPlayable"]);
        return {target, playable} as any;
    }

    it("Returns playable preset by expression", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interaction>{};

        const preset = createPreset(expectedExpression);
        preset.playable.isPlayable.and.returnValue(true);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(true);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBe(preset);
    });

    it("Returns the first playable preset", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interaction>{};

        const preset1 = createPreset(expectedExpression);
        preset1.playable.isPlayable.and.returnValue(true);

        const preset2 = createPreset(expectedExpression);
        preset2.playable.isPlayable.and.returnValue(true);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(true);

        resolve(Presets)
            .get.and.returnValue([preset1, preset2]);

        const provider = resolve(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBe(preset1);
    });

    it("Skips unplayable preset by expression and returns undefined", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interaction>{};

        const preset = createPreset(expectedExpression);
        preset.playable.isPlayable.and.returnValue(false);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(true);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Skips preset that expected expression does not match to the interaction expression", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interaction>{};

        const preset = createPreset(expectedExpression);
        preset.playable.isPlayable.and.returnValue(true);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(false);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(PlayablePresetProvider);
        const actual = provider.get(expression);

        expect(actual).toBeUndefined();
    });

    it("Does not check playability of a preset when its expected expression does not match to the interaction expression", () => {
        const expectedExpression = <ExpectedExpressions<unknown>>{};
        const expression = <Interaction>{};

        const preset = jasmine.createSpyObj<IPreset<unknown>>(["playable"]);
        (<any>preset).target = expectedExpression;

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, expectedExpression).and.returnValue(false);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(PlayablePresetProvider);
        provider.get(expression);

        expect(preset.playable).not.toHaveBeenCalled();
    });
});
