import { Interaction } from "../interactions";
import { InteractionPlayer } from "./interaction.player";
import { PlayablePresetProvider } from "./playable-preset.provider";
import { IPreset } from "../presets/presets/preset";
import { PresetPlayer } from "./preset.player";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { PresetPlayablesUpdater } from "../playables/preset-playables.updater";
import { It, Times } from "moq.ts";

describe("Interaction player", () => {
    beforeEach(() => {
        createInjector2(InteractionPlayer, [PlayablePresetProvider, PresetPlayablesUpdater, PresetPlayer]);
    });
    beforeEach(() => {
        resolveMock(PresetPlayablesUpdater)
            .prototypeof(PresetPlayablesUpdater.prototype);
    });

    class TestInteraction extends Interaction {
        constructor() {
            super(undefined, undefined);
        }
    }

    it("Plays interaction on appropriate preset and returns result", () => {
        const expression = new TestInteraction();
        const preset = {} as IPreset<unknown>;
        const result = {};

        resolveMock(PlayablePresetProvider)
            .setup(instance => instance.get(expression))
            .returns(preset);

        resolveMock(PresetPlayer)
            .setup(instance => instance.play(preset, expression))
            .returns(result);

        const player = resolve2(InteractionPlayer);
        const actual = player.play(expression);

        expect(actual).toBe(result);
    });

    it("Updates playables of presets", () => {
        const expression = new TestInteraction();
        const preset = {} as IPreset<unknown>;
        const result = {};

        resolveMock(PlayablePresetProvider)
            .setup(instance => instance.get(expression))
            .returns(preset);
        resolveMock(PresetPlayer)
            .setup(instance => instance.play(preset, expression))
            .returns(result);

        const player = resolve2(InteractionPlayer);
        const actual = player.play(expression);

        resolveMock(PresetPlayablesUpdater)
            .verify(instance => instance.update(expression, preset));
        expect(actual).toBe(result);
    });

    it("Does not play interaction when there is no appropriate preset and returns undefined", () => {
        const expression = new TestInteraction();

        resolveMock(PlayablePresetProvider)
            .setup(instance => instance.get(expression))
            .returns(undefined);

        const player = resolve2(InteractionPlayer);
        const actual = player.play(expression);

        resolveMock(PresetPlayer)
            .verify(instance => instance.play(It.IsAny(), It.IsAny()), Times.Never());
        expect(actual).toBeUndefined();
    });
});
