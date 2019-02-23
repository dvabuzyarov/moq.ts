import { IPreset } from "../../presets/preset";
import { ExpressionHasPropertyExplorer } from "./expression-has-property.explorer";
import { ObjectHasPropertyExplorer } from "./object-has-property.explorer";
import { MimicsPreset } from "../../presets/mimics.preset";

/**
 * @hidden
 */
export class PresetHasPropertyExplorer {
    constructor(private expressionHasPropertyExplorer: ExpressionHasPropertyExplorer = new ExpressionHasPropertyExplorer(),
                private objectHasPropertyExplorer: ObjectHasPropertyExplorer = new ObjectHasPropertyExplorer()) {

    }

    public has(name: PropertyKey, preset: IPreset<unknown>): boolean {
        if (preset instanceof MimicsPreset && this.objectHasPropertyExplorer.has(name, preset.origin)) {
            return true;
        }
        return this.expressionHasPropertyExplorer.has(name, preset.target);
    }
}
