import { IPreset } from "../../presets/preset";
import { ExpressionHasMethodExplorer } from "./expression.has-method.explorer";
import { ObjectHasMethodExplorer } from "./object.has-method.explorer";
import { ReplicatesPreset } from "../../presets/replicates.preset";

/**
 * @hidden
 */
export class PresetHasMethodExplorer {
    constructor(private expressionHasMethodExplorer: ExpressionHasMethodExplorer = new ExpressionHasMethodExplorer(),
                private objectHasMethodExplorer: ObjectHasMethodExplorer = new ObjectHasMethodExplorer()) {

    }

    public has(name: PropertyKey, preset: IPreset<unknown>): boolean {
        if (preset instanceof ReplicatesPreset && this.objectHasMethodExplorer.has(name, preset.origin)) {
            return true;
        }
        return this.expressionHasMethodExplorer.has(name, preset.target);
    }
}
