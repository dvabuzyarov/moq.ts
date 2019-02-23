import { IPreset } from "../presets/preset";
import { Expressions } from "../expressions";
import { ReturnsPreset } from "../presets/returns.preset";
import { CallbackPresetPlayer } from "./callback-preset.player";
import { CallbacksPreset } from "../presets/callbacks.preset";
import { ThrowsPreset } from "../presets/throws.preset";
import { MimicsPresetPlayer } from "./mimics-preset.player";
import { MimicsPreset } from "../presets/mimics.preset";

/**
 * @hidden
 */
export class PresetPlayer {
    constructor(
        private callbackPresetPlayer: CallbackPresetPlayer = new CallbackPresetPlayer(),
        private replicatePresetPlayer: MimicsPresetPlayer = new MimicsPresetPlayer()) {

    }

    public play<T>(preset: IPreset<T>, interaction: Expressions): any {
        if (preset instanceof ReturnsPreset) {
            return preset.value;
        }
        if (preset instanceof CallbacksPreset) {
            return this.callbackPresetPlayer.play(preset.callback, interaction);
        }
        if (preset instanceof MimicsPreset) {
            return this.replicatePresetPlayer.play(preset.origin, interaction);
        }
        if (preset instanceof ThrowsPreset) {
            throw preset.exception;
        }
    }
}
