import { Interaction } from "../interactions";
import { InteractionPlayer } from "./interaction.player";
import { PlayablePresetProvider } from "./playable-preset.provider";
import { IPreset } from "../presets/presets/preset";
import { PresetPlayer } from "./preset.player";
import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { PresetPlayablesUpdater } from "../playables/preset-playables.updater";

describe("Interaction player", () => {
    beforeEach(() => {
        const presetProvider = jasmine.createSpyObj<PlayablePresetProvider>("", ["get"]);
        const playablesUpdater = jasmine.createSpyObj<PresetPlayablesUpdater>("", ["update"]);
        const presetPlayer = jasmine.createSpyObj<PresetPlayer>("", ["play"]);
        createInjector([
            {provide: PlayablePresetProvider, useValue: presetProvider, deps: []},
            {provide: PresetPlayer, useValue: presetPlayer, deps: []},
            {provide: PresetPlayablesUpdater, useValue: playablesUpdater, deps: []},
            {
                provide: InteractionPlayer,
                useClass: InteractionPlayer,
                deps: [PlayablePresetProvider, PresetPlayablesUpdater, PresetPlayer]
            },
        ]);
    });

    class TestInteraction extends Interaction {
        constructor() {
            super(undefined, undefined);
        }
    }

    it("Plays interaction on appropriate preset and returns result", () => {
        const expression = new TestInteraction();
        const preset = <IPreset<unknown>>{};
        const result = {};

        resolve(PlayablePresetProvider)
            .get.withArgs(expression).and.returnValue(preset);

        resolve(PresetPlayer)
            .play.withArgs(preset, expression).and.returnValue(result);

        const player = resolve(InteractionPlayer);
        const actual = player.play(expression);

        expect(actual).toBe(result);
    });

    it("Updates playables of presets", () => {
        const expression = new TestInteraction();
        const preset = <IPreset<unknown>>{};
        const result = {};

        resolve(PlayablePresetProvider)
            .get.withArgs(expression).and.returnValue(preset);

        resolve(PresetPlayer)
            .play.withArgs(preset, expression).and.returnValue(result);

        const player = resolve(InteractionPlayer);
        const actual = player.play(expression);

        expect(resolve(PresetPlayablesUpdater).update).toHaveBeenCalledWith(expression, preset);
        expect(actual).toBe(result);
    });

    it("Does not play interaction when there is no appropriate preset and returns undefined", () => {
        const expression = new TestInteraction();

        resolve(PlayablePresetProvider)
            .get.and.returnValue(undefined);

        const player = resolve(InteractionPlayer);
        const actual = player.play(expression);

        expect(resolve(PresetPlayer).play).not.toHaveBeenCalled();
        expect(actual).toBeUndefined();
    });
});
