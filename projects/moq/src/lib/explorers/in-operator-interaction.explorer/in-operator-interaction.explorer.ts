import { PresetHasInOperatorExplorer } from "./preset.has-in-operator.explorer";
import { Presets } from "../../preset/presets";

/**
 * @hidden
 */
export class InOperatorInteractionExplorer {
    constructor(
        private presets: Presets<unknown>,
        private explorer = new PresetHasInOperatorExplorer()) {

    }

    public has(name: PropertyKey): boolean {
        return this.presets
            .get()
            .find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
