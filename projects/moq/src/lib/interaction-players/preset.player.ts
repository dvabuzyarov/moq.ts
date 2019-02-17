import { IPreset } from "../presets/preset";
import { Expressions } from "../expressions";
import { ReturnPresetPlayer } from "./return-preset.player";
import { ReturnsPreset } from "../presets/returns.preset";
import { CallbackPresetPlayer } from "./callback-preset.player";
import { ThrowPresetPlayer } from "./throw-preset.player";
import { CallbacksPreset } from "../presets/callbacks.preset";
import { ThrowsPreset } from "../presets/throws.preset";
import { ReplicatesPresetPlayer } from "./replicates-preset.player";
import { ReplicatesPreset } from "../presets/replicates.preset";

/**
 * @hidden
 */
export class PresetPlayer {
    constructor(
        private returnsPresetPlayer: ReturnPresetPlayer = new ReturnPresetPlayer(),
        private callbackPresetPlayer: CallbackPresetPlayer = new CallbackPresetPlayer(),
        private replicatePresetPlayer: ReplicatesPresetPlayer = new ReplicatesPresetPlayer(),
        private throwPresetPlayer: ThrowPresetPlayer = new ThrowPresetPlayer()) {

    }

    public play<T>(preset: IPreset<T>, interaction: Expressions): any {
        if (preset instanceof ReturnsPreset) {
            return this.returnsPresetPlayer.play(preset, interaction);
        }
        if (preset instanceof CallbacksPreset) {
            return this.callbackPresetPlayer.play(preset.callback, interaction);
        }
        if (preset instanceof ReplicatesPreset) {
            return this.replicatePresetPlayer.play(preset, interaction);
        }
        if (preset instanceof ThrowsPreset) {
            this.throwPresetPlayer.play(preset);
        }
    }
}
