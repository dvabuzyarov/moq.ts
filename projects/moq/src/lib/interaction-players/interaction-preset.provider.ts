import { IPreset } from "../presets/preset";
import { Expressions } from "../expressions";

export class InteractionPresetProvider<T> {
    public get(interaction: Expressions): IPreset<T> {
        throw new Error("Not Implemented");
    }
}
