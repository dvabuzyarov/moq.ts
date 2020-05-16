import { PresetHasInOperatorExplorer } from "./preset.has-in-operator.explorer";
import { Presets } from "../../presets/presets";

/**
 * @hidden
 */
export class InOperatorInteractionExplorer {
    constructor(
        private presets: Presets<unknown>,
        private explorer: PresetHasInOperatorExplorer) {

    }

    public has(name: PropertyKey): boolean {
        return this.presets
            .get()
            .find(preset => this.explorer.has(name, preset)) !== undefined;
    }
}
