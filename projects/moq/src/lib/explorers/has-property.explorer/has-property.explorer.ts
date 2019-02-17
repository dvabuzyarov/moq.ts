import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";
import { Presets } from "../../preset/presets";

/**
 * @hidden
 */
export class HasPropertyExplorer {
    constructor(
        private presets: Presets<unknown>,
        private explorer: PresetHasPropertyExplorer = new PresetHasPropertyExplorer()) {

    }

    public has(name: PropertyKey): boolean {
        return this.presets
            .get()
            .find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
