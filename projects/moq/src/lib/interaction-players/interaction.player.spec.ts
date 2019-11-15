import { GetPropertyInteraction } from "../interactions";
import { InteractionPlayer } from "./interaction.player";
import { InteractionPresetProvider } from "./interaction-preset.provider";
import { IPreset } from "../presets/preset";
import { PresetPlayer } from "./preset.player";

describe("Interaction player", () => {

    it("Plays interaction on appropriate preset and returns result", () => {
        const expression = new GetPropertyInteraction("");
        const preset = <IPreset<unknown>>{};
        const result = {};

        const interactionPresetProvider = jasmine.createSpyObj<InteractionPresetProvider>("", ["get"]);
        interactionPresetProvider.get.withArgs(expression).and.returnValue(preset);

        const presetPlayer = jasmine.createSpyObj<PresetPlayer>("", ["play"]);
        presetPlayer.play.withArgs(preset, expression).and.returnValue(result);

        const player = new InteractionPlayer(interactionPresetProvider, presetPlayer);
        const actual = player.play(expression);

        expect(actual).toBe(result);
    });

    it("Does not play interaction when there is no appropriate preset and returns undefined", () => {
        const expression = new GetPropertyInteraction("");

        const interactionPresetProvider = jasmine.createSpyObj<InteractionPresetProvider>("", ["get"]);
        interactionPresetProvider.get.and.returnValue(undefined);

        const presetPlayer = jasmine.createSpyObj<PresetPlayer>("", ["play"]);

        const player = new InteractionPlayer(interactionPresetProvider, presetPlayer);
        const actual = player.play(expression);

        expect(presetPlayer.play).not.toHaveBeenCalled();
        expect(actual).toBeUndefined();
    });
});
