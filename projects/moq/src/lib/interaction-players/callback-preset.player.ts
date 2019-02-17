import { CallbacksPreset } from "../presets/callbacks.preset";
import { Expressions } from "../expressions";

/**
 * @hidden
 */
export class CallbackPresetPlayer {
    public play<T>(preset: CallbacksPreset<T>, interaction: Expressions): any {
        throw new Error("Not Implemented");
    }
}
