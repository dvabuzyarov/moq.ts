import { IPreset } from "../../presets/presets/preset";
import { ExpressionHasPropertyExplorer } from "./expression-has-property.explorer";
import { ObjectHasPropertyExplorer } from "./object-has-property.explorer";
import { MimicsPreset } from "../../presets/presets/mimics.preset";

/**
 * @hidden
 */
export class PresetHasPropertyExplorer {
    constructor(private expressionHasPropertyExplorer: ExpressionHasPropertyExplorer,
                private objectHasPropertyExplorer: ObjectHasPropertyExplorer) {

    }

    public has(name: PropertyKey, preset: IPreset<unknown>): boolean {
        if (preset instanceof MimicsPreset && this.objectHasPropertyExplorer.has(name, preset.origin)) {
            return true;
        }
        return this.expressionHasPropertyExplorer.has(name, preset.target);
    }
}
