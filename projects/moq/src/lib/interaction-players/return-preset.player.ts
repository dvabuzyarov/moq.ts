import { ReturnsPreset } from "../presets/returns.preset";
import { Expressions } from "../expressions";

/**
 * @hidden
 */
export class ReturnPresetPlayer {
    public play<T>(preset: ReturnsPreset<T, unknown>, interaction: Expressions): any {
        throw new Error("Not Implemented");
    }
}
