import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";
import { Presets2 } from "../../preset/presets2";

/**
 * @hidden
 */
export class HasPropertyExplorer {
    constructor(
        private presets: Presets2<unknown>,
        private explorer: PresetHasPropertyExplorer = new PresetHasPropertyExplorer()) {

    }

    public has(name: PropertyKey): boolean {
        return this.presets
            .get()
            .find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
