import { Interactions } from "../interactions";
import { InteractionPresetProvider } from "./interaction-preset.provider";
import { PresetPlayer } from "./preset.player";

/**
 * @hidden
 */
export class InteractionPlayer {
    constructor(
        private interactionPresetProvider: InteractionPresetProvider,
        private presetPlayer: PresetPlayer = new PresetPlayer()) {

    }

    public play(interaction: Interactions): any {
        const preset = this.interactionPresetProvider.get(interaction);
        if (preset === undefined) return undefined;
        return this.presetPlayer.play(preset, interaction);
    }
}
