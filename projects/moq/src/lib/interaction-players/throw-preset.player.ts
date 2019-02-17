import { ThrowsPreset } from "../presets/throws.preset";

/**
 * @hidden
 */
export class ThrowPresetPlayer {
    public play<T>(preset: ThrowsPreset<T, unknown>): void {
        throw new Error("Not Implemented");
    }
}
