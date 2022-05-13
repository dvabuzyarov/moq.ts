import { Expression } from "../reflector/expressions";
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
        private presetPlayer: PresetPlayer) {

    }

    public play(interaction: Expression): any {
        const preset = this.playablePresetProvider.get(interaction);
        this.presetPlayablesUpdater.update(interaction, preset);
        if (preset === undefined) return undefined;
        return this.presetPlayer.play(preset, interaction);
    }
}
