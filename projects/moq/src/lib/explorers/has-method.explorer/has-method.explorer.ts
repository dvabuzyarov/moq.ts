import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { Presets2 } from "../../preset/presets2";

/**
 * @hidden
 */
export class HasMethodExplorer {
    constructor(
        private presets: Presets2<unknown>,
        private explorer: PresetHasMethodExplorer = new PresetHasMethodExplorer()) {

    }

    public has(name: PropertyKey): boolean {
        return this.presets
            .get()
            .find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
