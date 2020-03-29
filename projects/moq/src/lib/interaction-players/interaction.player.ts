import { Interaction } from "../interactions";
import { PlayablePresetProvider } from "./playable-preset.provider";
import { PresetPlayer } from "./preset.player";
import { PresetPlayablesUpdater } from "../playables/preset-playables.updater";

/**
 * @hidden
 */
export class InteractionPlayer {
    constructor(
        private playablePresetProvider: PlayablePresetProvider,
        private presetPlayablesUpdater: PresetPlayablesUpdater,
        private presetPlayer = new PresetPlayer()) {

    }

    public play(interaction: Interaction): any {
        const preset = this.playablePresetProvider.get(interaction);
        this.presetPlayablesUpdater.update(interaction, preset);
        if (preset === undefined) return undefined;
        return this.presetPlayer.play(preset, interaction);
    }
}
