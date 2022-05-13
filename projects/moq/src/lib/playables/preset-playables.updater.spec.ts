import { Expressions } from "../reflector/expressions";
import { Expression } from "../reflector/expressions";
import { Presets } from "../presets/presets";
import { PresetPlayablesUpdater } from "./preset-playables.updater";
import { IPreset } from "../presets/presets/preset";
import { createInjector, resolve2, resolveMock, SpiedObject } from "../../tests.components/resolve.builder";
import { IPlayable, PlayableUpdateReason } from "../moq";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

describe("Presets playable updater", () => {
    beforeEach(() => {
        createInjector(PresetPlayablesUpdater, [Presets, ExpressionEqualityComparer]);
    });

    const createPreset = (target: Expressions<unknown>): SpiedObject<IPreset<unknown>> => {
        const playable = jasmine.createSpyObj<IPlayable>(["update"]);
        return {target, playable} as any;
    };

    it("Updates playable preset", () => {
        const target = {} as Expressions<unknown>;
        const expression = {} as Expression;

        const preset = createPreset(target);

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, target))
            .returns(true);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PresetPlayablesUpdater);
        provider.update(expression, preset);

        expect(preset.playable.update).toHaveBeenCalledWith(PlayableUpdateReason.OwnSetupWouldBePlayed);
    });

    it("Updates preset", () => {
        const target = {} as Expressions<unknown>;
        const expression = {} as Expression;

        const preset = createPreset(target);

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, target))
            .returns(true);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PresetPlayablesUpdater);
        provider.update(expression, undefined);

        expect(preset.playable.update).toHaveBeenCalledWith(PlayableUpdateReason.OtherSetupWouldBePlayed);
    });

    it("Does not update preset", () => {
        const target = {} as Expressions<unknown>;
        const expression = {} as Expression;

        const preset = createPreset(target);

        resolveMock(ExpressionEqualityComparer)
            .setup(instance => instance.equals(expression, target))
            .returns(false);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        const provider = resolve2(PresetPlayablesUpdater);
        provider.update(expression, undefined);

        expect(preset.playable.update).not.toHaveBeenCalled();
    });
});
