import { ReplicatesPreset } from "../presets/replicates.preset";
import { Expressions } from "../expressions";

/**
 * @hidden
 */
export class ReplicatesPresetPlayer {
    public play<T>(preset: ReplicatesPreset<T>, interaction: Expressions): any {
        throw new Error("Not Implemented");
    }
}
