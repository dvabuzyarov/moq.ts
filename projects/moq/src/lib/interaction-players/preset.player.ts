import { IPreset } from "../presets/presets/preset";
import { Expression } from "../reflector/expressions";
import { ReturnsPreset } from "../presets/presets/returns.preset";
import { CallbackPresetPlayer } from "./callback-preset.player";
import { CallbacksPreset } from "../presets/presets/callbacks.preset";
import { ThrowsPreset } from "../presets/presets/throws.preset";
import { MimicsPresetPlayer } from "./mimics-preset.player";
import { MimicsPreset } from "../presets/presets/mimics.preset";

/**
 * @hidden
 */
export class PresetPlayer {
    constructor(
        private callbackPresetPlayer: CallbackPresetPlayer,
        private mimicsPresetPlayer: MimicsPresetPlayer) {

    }

    public play<T>(preset: IPreset<T>, interaction: Expression): any {
        if (preset instanceof ReturnsPreset) {
            return preset.value;
        }
        if (preset instanceof CallbacksPreset) {
            return this.callbackPresetPlayer.play(preset.callback, interaction);
        }
        if (preset instanceof MimicsPreset) {
            return this.mimicsPresetPlayer.play(preset.origin, interaction);
        }
        if (preset instanceof ThrowsPreset) {
            throw preset.exception;
        }
    }
}
