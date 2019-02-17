import { IPreset } from "../presets/preset";
import { Expressions } from "../expressions";

export class PresetPlayer {
    public play<T>(preset: IPreset<T>, interaction: Expressions): any {
        throw new Error("Not Implemented");
    }
}
