import { IPreset } from "../presets/preset";
import { Expressions } from "../expressions";
import { ExpressionMatcher } from "../expression-matchers/expression-matcher";
import { Presets2 } from "../preset/presets2";

/**
 * @hidden
 */
export class InteractionPresetProvider<T> {

    constructor(
        private presets: Presets2<T>,
        private matcher = new ExpressionMatcher()) {

    }

    public get(interaction: Expressions): IPreset<T> | undefined {
        for (const preset of this.presets.get()) {
            if (this.matcher.matched(interaction, preset.target) && preset.invocable() === true) {
                return preset;
            }
        }
    }
}
