import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { Interaction } from "../interactions";
import { Presets } from "../presets/presets";
import { PresetPlayablesUpdater } from "./preset-playables.updater";
import { IPreset } from "../presets/presets/preset";
import { createInjector, resolve, SpiedObject } from "../../tests.components/resolve.builder";
import { IPlayable, PlayableUpdateReason } from "../moq";

describe("Presets playable updater", () => {

    beforeEach(() => {
        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        const matcher = jasmine.createSpyObj<ExpressionMatcher>(["matched"]);

        createInjector([
            {provide: Presets, useValue: presets, deps: []},
            {provide: ExpressionMatcher, useValue: matcher, deps: []},
            {provide: PresetPlayablesUpdater, useClass: PresetPlayablesUpdater, deps: [Presets, ExpressionMatcher]},
        ]);
    });

    function createPreset(target: ExpectedExpressions<unknown>): SpiedObject<IPreset<unknown>> {
        const playable = jasmine.createSpyObj<IPlayable>(["update"]);
        return {target, playable} as any;
    }

    it("Updates playable preset", () => {
        const target = <ExpectedExpressions<unknown>>{};
        const expression = <Interaction>{};

        const preset = createPreset(target);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, target).and.returnValue(true);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(PresetPlayablesUpdater);
        provider.update(expression, preset);

        expect(preset.playable.update).toHaveBeenCalledWith(PlayableUpdateReason.OwnSetupWouldBePlayed);
    });

    it("Updates preset", () => {
        const target = <ExpectedExpressions<unknown>>{};
        const expression = <Interaction>{};

        const preset = createPreset(target);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, target).and.returnValue(true);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(PresetPlayablesUpdater);
        provider.update(expression, undefined);

        expect(preset.playable.update).toHaveBeenCalledWith(PlayableUpdateReason.OtherSetupWouldBePlayed);
    });

    it("Does not update preset", () => {
        const target = <ExpectedExpressions<unknown>>{};
        const expression = <Interaction>{};

        const preset = createPreset(target);

        resolve(ExpressionMatcher)
            .matched.withArgs(expression, target).and.returnValue(false);

        resolve(Presets)
            .get.and.returnValue([preset]);

        const provider = resolve(PresetPlayablesUpdater);
        provider.update(expression, undefined);

        expect(preset.playable.update).not.toHaveBeenCalled();
    });
});
