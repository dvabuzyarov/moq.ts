import { Expressions } from "../expressions";
import { InteractionPresetProvider } from "./interaction-preset.provider";
import { PresetPlayer } from "./preset.player";

/**
 * @hidden
 */
export class InteractionPlayer<T> {
    constructor(
        private interactionPresetProvider: InteractionPresetProvider<T>,
        private presetPlayer: PresetPlayer) {

    }

    public play(expression: Expressions): any {
        const preset = this.interactionPresetProvider.get(expression);
        if (preset === undefined) return undefined;
        return this.presetPlayer.play(preset, expression);
    }
}
