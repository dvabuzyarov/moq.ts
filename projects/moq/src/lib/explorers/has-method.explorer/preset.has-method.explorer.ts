import { IPreset } from "../../presets/preset";
import { ExpressionHasMethodExplorer } from "./expression.has-method.explorer";
import { ObjectHasMethodExplorer } from "./object.has-method.explorer";
import { MimicsPreset } from "../../presets/mimics.preset";

/**
 * @hidden
 */
export class PresetHasMethodExplorer {
    constructor(private expressionHasMethodExplorer: ExpressionHasMethodExplorer = new ExpressionHasMethodExplorer(),
                private objectHasMethodExplorer: ObjectHasMethodExplorer = new ObjectHasMethodExplorer()) {

    }

    public has(name: PropertyKey, preset: IPreset<unknown>): boolean {
        if (preset instanceof MimicsPreset && this.objectHasMethodExplorer.has(name, preset.origin)) {
            return true;
        }
        return this.expressionHasMethodExplorer.has(name, preset.target);
    }
}
