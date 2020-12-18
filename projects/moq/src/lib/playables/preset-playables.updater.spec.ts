import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { Interaction } from "../interactions";
import { Presets } from "../presets/presets";
import { PresetPlayablesUpdater } from "./preset-playables.updater";
import { IPreset } from "../presets/presets/preset";
import { createInjector2, resolve2, resolveMock, SpiedObject } from "../../tests.components/resolve.builder";
import { IPlayable, PlayableUpdateReason } from "../moq";

describe("Presets playable updater", () => {
    beforeEach(() => {
        createInjector2(PresetPlayablesUpdater, [Presets, ExpressionMatcher]);
    });

    const createPreset = (target: ExpectedExpressions<unknown>): SpiedObject<IPreset<unknown>> => {
        const playable = jasmine.createSpyObj<IPlayable>(["update"]);
        return {target, playable} as any;
    };

    it("Updates playable preset", () => {
        const target = {} as ExpectedExpressions<unknown>;
        const expression = {} as Interaction;

        const preset = createPreset(target);

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, target))
            .returns(true);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PresetPlayablesUpdater);
        provider.update(expression, preset);

        expect(preset.playable.update).toHaveBeenCalledWith(PlayableUpdateReason.OwnSetupWouldBePlayed);
    });

    it("Updates preset", () => {
        const target = {} as ExpectedExpressions<unknown>;
        const expression = {} as Interaction;

        const preset = createPreset(target);

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, target))
            .returns(true);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PresetPlayablesUpdater);
        provider.update(expression, undefined);

        expect(preset.playable.update).toHaveBeenCalledWith(PlayableUpdateReason.OtherSetupWouldBePlayed);
    });

    it("Does not update preset", () => {
        const target = {} as ExpectedExpressions<unknown>;
        const expression = {} as Interaction;

        const preset = createPreset(target);

        resolveMock(ExpressionMatcher)
            .setup(instance => instance.matched(expression, target))
            .returns(false);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PresetPlayablesUpdater);
        provider.update(expression, undefined);

        expect(preset.playable.update).not.toHaveBeenCalled();
    });
});
