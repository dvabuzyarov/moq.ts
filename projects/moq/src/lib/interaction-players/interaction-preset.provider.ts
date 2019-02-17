import { IPreset } from "../presets/preset";
import { Expressions } from "../expressions";
import { ExpressionMatcher } from "../expression-matchers/expression-matcher";
import { Presets2 } from "../preset/presets2";

/**
 * @hidden
 */
export class InteractionPresetProvider {

    constructor(
        private presets: Presets2<unknown>,
        private matcher = new ExpressionMatcher()) {

    }

    public get(interaction: Expressions): IPreset<unknown> | undefined {
        for (const preset of this.presets.get()) {
            if (this.matcher.matched(interaction, preset.target) && preset.invocable() === true) {
                return preset;
            }
        }
    }
}
