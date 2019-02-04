import { IPreset } from "../../presets/preset";
import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";

/**
 * @hidden
 */
export class HasPropertyExplorer {
    constructor(private explorer: PresetHasPropertyExplorer = new PresetHasPropertyExplorer()) {

    }

    public has(name: PropertyKey, presets: IPreset<unknown>[]): boolean {
        return presets.find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
