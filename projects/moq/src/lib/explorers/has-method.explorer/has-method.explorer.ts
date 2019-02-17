import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { Presets } from "../../preset/presets";

/**
 * @hidden
 */
export class HasMethodExplorer {
    constructor(
        private presets: Presets<unknown>,
        private explorer: PresetHasMethodExplorer = new PresetHasMethodExplorer()) {

    }

    public has(name: PropertyKey): boolean {
        return this.presets
            .get()
            .find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
