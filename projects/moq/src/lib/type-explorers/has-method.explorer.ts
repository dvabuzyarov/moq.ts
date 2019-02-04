import { IPreset } from "../presets/preset";
import { PresetHasMethodExplorer } from "./preset.has-method.explorer";

export class HasMethodExplorer {
    constructor(private explorer: PresetHasMethodExplorer) {

    }

    public has(name: PropertyKey, presets: IPreset<unknown>[]): boolean {
        return presets.find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
