import { Expressions } from "../expressions";
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

    public play(expression: Expressions): any {
        const preset = this.interactionPresetProvider.get(expression);
        if (preset === undefined) return undefined;
        return this.presetPlayer.play(preset, expression);
    }
}
