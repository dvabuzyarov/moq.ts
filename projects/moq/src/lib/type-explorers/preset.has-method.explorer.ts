import { IPreset } from "../presets/preset";

export class PresetHasMethodExplorer {
    public has(name: PropertyKey, preset: IPreset<unknown>): boolean {
        throw new Error("Not Implemented");
    }
}
